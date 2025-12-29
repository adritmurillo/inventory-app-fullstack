package com.joaco.inventory.infrastructure.input.rest.model;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder

public class DashboardStats {
    private int totalProducts;
    private BigDecimal totalInventoryValue;
    private int lowStockCount;
}
