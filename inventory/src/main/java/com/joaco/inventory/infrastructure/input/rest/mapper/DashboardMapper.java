package com.joaco.inventory.infrastructure.input.rest.mapper;

import com.joaco.inventory.domain.model.DashboardStats;
import com.joaco.inventory.infrastructure.input.rest.model.DashboardStatsResponse;
import org.springframework.stereotype.Component;

@Component
public class DashboardMapper {

    public DashboardStatsResponse toResponse(DashboardStats domain) {
        return DashboardStatsResponse.builder()
                .totalInventoryValue(domain.getTotalInventoryValue())
                .totalProducts(domain.getTotalProducts())
                .lowStockCount(domain.getLowStockCount())
                .build();
    }
}