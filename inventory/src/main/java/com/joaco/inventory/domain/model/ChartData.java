package com.joaco.inventory.domain.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ChartData {
    private String label;
    private Double value;
}
