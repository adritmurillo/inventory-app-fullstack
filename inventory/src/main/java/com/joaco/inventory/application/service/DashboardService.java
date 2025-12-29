package com.joaco.inventory.application.service;

import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.port.out.ProductRepositoryPort;
import com.joaco.inventory.infrastructure.input.rest.model.DashboardStats;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepositoryPort productRepositoryPort;

    public DashboardStats getStats() {
        List<Product> products = productRepositoryPort.findAll();

        int totalProducts = products.size();

        BigDecimal totalValue = products.stream()
                .map(p -> p.getPrice().multiply(BigDecimal.valueOf(p.getStock())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int lowStock = (int) products.stream()
                .filter(p -> p.getStock() <= p.getMinStock())
                .count();

        return DashboardStats.builder()
                .totalProducts(totalProducts)
                .totalInventoryValue(totalValue)
                .lowStockCount(lowStock)
                .build();
    }
}