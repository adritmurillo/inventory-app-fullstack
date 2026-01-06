package com.joaco.inventory.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SupplyDetail {
    private Long id;
    private Long productId;
    private Integer quantity;
    private BigDecimal unitCost;
    private BigDecimal subtotal;
}
