package com.joaco.inventory.infrastructure.input.rest.model;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
public class DashboardResponse {
    private int totalProducts;
    private BigDecimal totalInventoryValue;
    private int lowStockCount;

    private BigDecimal salesToday;
    private BigDecimal suppliesToday;
    private BigDecimal profitToday;

    private BigDecimal salesThisMonth;
    private Map<String, Integer> topSellingProducts;
}
