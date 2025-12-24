package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.Category;

import java.util.List;

public interface CategoryServicePort {
    Category createCategory(Category category);
    List<Category> getAllCategories();
}
