package com.joaco.inventory.infrastructure.input.rest.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SupplyItemRequest {
    private Long productId;
    private Integer quantity;
    private BigDecimal unitCost;
}