package com.joaco.inventory.application.service;

import com.joaco.inventory.domain.model.*;
import com.joaco.inventory.domain.port.in.DashboardServicePort;
import com.joaco.inventory.domain.port.out.ProductRepositoryPort;
import com.joaco.inventory.domain.port.out.SaleRepositoryPort;
import com.joaco.inventory.domain.port.out.SupplyRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService implements DashboardServicePort {

    private final ProductRepositoryPort productRepo;
    private final SaleRepositoryPort saleRepo;
    private final SupplyRepositoryPort supplyRepo;
    private final DateRangeService dateRangeService;

    @Override
    public DashboardStats getStats(DashboardFilter filter) {
        dateRangeService.validateFilter(filter);
        DateRangeService.DateRange range = dateRangeService.calculateRange(filter);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).with(LocalTime.MIN);
        LocalDateTime endOfMonth = now.with(LocalTime.MAX);

        List<Product> allProducts = productRepo.findAll();
        List<Sale> salesInRange = saleRepo.findByDateBetween(range.start(), range.end());
        List<Supply> suppliesInRange = supplyRepo.findByDateBetween(range.start(), range.end());
        List<Sale> salesMonth = saleRepo.findByDateBetween(startOfMonth, endOfMonth);

        int totalProducts = allProducts.size();

        BigDecimal totalInventoryValue = allProducts.stream()
                .map(p -> p.getPrice().multiply(BigDecimal.valueOf(p.getStock())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int lowStockCount = (int) allProducts.stream()
                .filter(p -> p.getStock() <= 5)
                .count();

        BigDecimal totalSalesInRange = salesInRange.stream()
                .map(Sale::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalSupplyCostInRange = suppliesInRange.stream()
                .map(Supply::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal profitInRange = totalSalesInRange.subtract(totalSupplyCostInRange);

        BigDecimal totalSalesMonth = salesMonth.stream()
                .map(Sale::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<Long, String> productNames = allProducts.stream()
                .collect(Collectors.toMap(Product::getId, Product::getName));

        Map<Long, Integer> salesByProductId = salesInRange.stream()
                .flatMap(sale -> sale.getItems().stream())
                .collect(Collectors.groupingBy(
                        SaleDetail::getProductId,
                        Collectors.summingInt(SaleDetail::getQuantity)
                ));

        Map<String, Integer> topSellingProducts = salesByProductId.entrySet().stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toMap(
                        entry -> productNames.getOrDefault(entry.getKey(), "Deleted product"),
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));

        if (topSellingProducts.isEmpty()) {
            topSellingProducts = Collections.emptyMap();
        }

        return DashboardStats.builder()
                .totalProducts(totalProducts)
                .totalInventoryValue(totalInventoryValue)
                .lowStockCount(lowStockCount)
                .salesToday(totalSalesInRange)
                .suppliesToday(totalSupplyCostInRange)
                .profitToday(profitInRange)
                .salesThisMonth(totalSalesMonth)
                .topSellingProducts(topSellingProducts)
                .build();
    }

    @Override
    public List<ChartData> getProductsByCategory(DashboardFilter filter) {
        dateRangeService.validateFilter(filter);

        DateRangeService.DateRange range = dateRangeService.calculateRange(filter);

        List<Sale> salesInRange = saleRepo.findByDateBetween(range.start(), range.end());

        if (salesInRange.isEmpty()) {
            List<Product> products = productRepo.findAll();
            Map<String, Long> grouping = products.stream().collect(Collectors.groupingBy(
                    p -> p.getCategory() != null ? p.getCategory().getName() : "No category",
                    Collectors.counting()
            ));
            return grouping.entrySet().stream()
                    .map(entry -> new ChartData(entry.getKey(), entry.getValue().doubleValue()))
                    .toList();
        }

        List<Product> allProducts = productRepo.findAll();
        Map<Long, String> productCategories = allProducts.stream()
                .collect(Collectors.toMap(
                        Product::getId,
                        p -> p.getCategory() != null ? p.getCategory().getName() : "No category"
                ));

        Map<String, Integer> salesByCategory = salesInRange.stream()
                .flatMap(sale -> sale.getItems().stream())
                .collect(Collectors.groupingBy(
                        item -> productCategories.getOrDefault(item.getProductId(), "No category"),
                        Collectors.summingInt(SaleDetail::getQuantity)
                ));

        return salesByCategory.entrySet().stream()
                .map(entry -> new ChartData(entry.getKey(), entry.getValue().doubleValue()))
                .toList();
    }

    @Override
    public List<Product> getLowStockProducts(DashboardFilter filter) {
        dateRangeService.validateFilter(filter);
        return productRepo.findAll().stream()
                .filter(Product::isStockLow)
                .toList();
    }

    @Override
    public List<ChartData> getInventoryValueByCategory(DashboardFilter filter) {
        dateRangeService.validateFilter(filter);
        List<Product> products = productRepo.findAll();
        Map<String, BigDecimal> grouping = products.stream()
                .collect(Collectors.groupingBy(
                        p -> p.getCategory() != null ? p.getCategory().getName() : "Sin Categoría",
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                p -> p.getPrice().multiply(BigDecimal.valueOf(p.getStock())),
                                BigDecimal::add
                        )
                ));
        return grouping.entrySet().stream()
                .map(entry -> new ChartData(entry.getKey(), entry.getValue().doubleValue()))
                .toList();
    }

    @Override
    public List<Product> getAllProductsSortedByPrice(DashboardFilter filter) {
        dateRangeService.validateFilter(filter);

        String direction = filter != null && filter.getSort() != null ? filter.getSort() : "desc";
        return productRepo.findAllSortedByPrice(direction);
    }
}