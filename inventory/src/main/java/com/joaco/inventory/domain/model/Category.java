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

    public void updateName(String newName) {
        if (newName == null || newName.isBlank()) {
            throw new IllegalArgumentException("Category name cannot be empty");
        }
        this.name = newName;
    }

    public void updateDescription(String newDescription) {
        if (newDescription == null) {
            this.description = "";
        } else {
            this.description = newDescription;
        }
    }
}