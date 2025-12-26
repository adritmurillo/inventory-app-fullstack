package com.joaco.inventory.domain.model;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductFilter {
    private String name;
    private Long categoryId;
}
