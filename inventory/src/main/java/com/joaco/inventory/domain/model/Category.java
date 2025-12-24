package com.joaco.inventory.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class Category {
    private Long id;
    private String name;
    private String description;
}
