package com.joaco.inventory.infrastructure.input.rest.model;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class DashboardStatsResponse {
    private BigDecimal totalInventoryValue;
    private int totalProducts;
    private int lowStockCount;
    private int totalCategories;
}