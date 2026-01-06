package com.joaco.inventory.infrastructure.input.rest.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SupplyResponse {
    private Long id;
    private LocalDateTime date;
    private BigDecimal total;
    private String username;
    private List<SupplyDetailResponse> items;
}