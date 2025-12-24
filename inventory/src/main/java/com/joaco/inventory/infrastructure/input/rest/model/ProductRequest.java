package com.joaco.inventory.infrastructure.input.rest.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    @NotBlank(message = "Name is mandatory")
    private String name;
    private String description;

    @NotNull(message = "Price is mandatory")
    @Positive(message = "Price should be greater than 0")
    private BigDecimal price;

    @NotNull(message = "Stock is mandatory")
    @Positive(message = "Stock should be greater than 0")
    private Integer stock;
    private Integer minStock;
    private Long categoryId;
}
