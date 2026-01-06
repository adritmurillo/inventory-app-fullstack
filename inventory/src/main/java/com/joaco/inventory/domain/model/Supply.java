package com.joaco.inventory.domain.model;

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
public class Supply {
    private Long id;
    private LocalDateTime date;
    private BigDecimal total;
    private Long userId;
    private String username;
    private List<SupplyDetail> items;
}
