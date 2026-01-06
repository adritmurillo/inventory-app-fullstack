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
public class Sale {
    private Long id;
    private LocalDateTime date;
    private BigDecimal total;
    private Long userId;
    private List<SaleDetail> items;
}
