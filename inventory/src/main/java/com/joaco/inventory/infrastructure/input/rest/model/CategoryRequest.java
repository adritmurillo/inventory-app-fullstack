package com.joaco.inventory.infrastructure.input.rest.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank(message = "Name is required")
    private String name;
    private String description;
}