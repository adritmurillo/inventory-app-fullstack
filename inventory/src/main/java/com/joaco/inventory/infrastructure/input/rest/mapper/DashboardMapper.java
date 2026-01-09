package com.joaco.inventory.infrastructure.input.rest.mapper;

import com.joaco.inventory.domain.model.DashboardStats;
import com.joaco.inventory.infrastructure.input.rest.model.DashboardResponse;
import org.springframework.stereotype.Component;

@Component
public class DashboardMapper {
    public DashboardResponse toResponse(DashboardStats stats) {
        if (stats == null) return null;

        return DashboardResponse.builder()
                .totalProducts(stats.getTotalProducts())
                .totalInventoryValue(stats.getTotalInventoryValue())
                .lowStockCount(stats.getLowStockCount())
                .salesToday(stats.getSalesToday())
                .suppliesToday(stats.getSuppliesToday())
                .profitToday(stats.getProfitToday())
                .salesThisMonth(stats.getSalesThisMonth())
                .topSellingProducts(stats.getTopSellingProducts())
                .build();
    }
}