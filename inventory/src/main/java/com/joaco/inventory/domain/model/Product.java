package com.joaco.inventory.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor
public class Product {
    private Long id;
    private String name;
    private String description;
    private int stock;
    private int minStock;
    private BigDecimal price;
    private Category category;

    public void updateStock(Integer quantity){
        if (quantity < 0) throw new IllegalArgumentException("Quantity should be greater than 0");
        this.stock = quantity;
    }

    public void updatePrice(BigDecimal newPrice){
        if (newPrice.compareTo(BigDecimal.ZERO) <=0) throw new IllegalArgumentException("Price should be greater than 0");
        this.price = newPrice;
    }

    public void updateName(String newName){
        if(newName == null || newName.isBlank()) throw new IllegalArgumentException("Name should not be null");
        this.name = newName;
    }

    public void updateDescription(String newDescription){
        if (newDescription == null || newDescription.isBlank()) throw new IllegalArgumentException("Description should not be null");
        this.description = newDescription;
    }

    public void updateMinStock(Integer newMinStock){
        if (newMinStock == null || newMinStock < 0)  throw new IllegalArgumentException("MinStock should be greater than 0");
        this.minStock = newMinStock;
    }

    public void updateCategory(Category newCategory){
        if (newCategory == null) throw new IllegalArgumentException("Category should not be null");
        this.category = newCategory;
    }

    public boolean isStockLow(){
        return this.stock <= this.minStock;
    }
}

