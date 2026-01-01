package com.joaco.inventory.application.service;

import com.joaco.inventory.domain.model.ChartData;
import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.port.in.DashboardServicePort;
import com.joaco.inventory.domain.port.out.ProductRepositoryPort;
import com.joaco.inventory.domain.model.DashboardStats;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService implements DashboardServicePort {

    private final ProductRepositoryPort productRepositoryPort;

    @Override
    public DashboardStats getStats() {
        List<Product> products = productRepositoryPort.findAll();

        int totalProducts = products.size();

        BigDecimal totalValue = products.stream()
                .map(p -> p.getPrice().multiply(BigDecimal.valueOf(p.getStock())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int lowStock = (int) products.stream()
                .filter(Product :: isStockLow)
                .count();

        return DashboardStats.builder()
                .totalProducts(totalProducts)
                .totalInventoryValue(totalValue)
                .lowStockCount(lowStock)
                .build();
    }

    @Override
    public List<ChartData> getProductsByCategory() {
        List<Product> products = productRepositoryPort.findAll();
        Map<String, Long> grouping = products.stream().collect(Collectors.groupingBy(
                p -> p.getCategory() != null ? p.getCategory().getName() : "No category",
                Collectors.counting()
        ));

        return grouping.entrySet().stream()
                .map(entry -> new ChartData(entry.getKey(), entry.getValue().doubleValue()))
                .toList();
    }

    @Override
    public List<Product> getLowStockProducts() {
        return productRepositoryPort.findAll().stream()
                .filter(Product :: isStockLow)
                .toList();
    }

    @Override
    public List<ChartData> getInventoryValueByCategory() {
        List<Product> products = productRepositoryPort.findAll();
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
    public List<Product> getAllProductsSortedByPrice(String direction) {
        return productRepositoryPort.findAllSortedByPrice(direction);
    }
}