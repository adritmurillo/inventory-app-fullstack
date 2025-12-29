package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.Category;

import java.util.List;

public interface CategoryServicePort {
    Category createCategory(Category category);
    List<Category> getAllCategories();
    Category getCategoryById(Long id);           // Para cargar el formulario de edición
    Category updateCategory(Long id, Category category); // Para guardar la edición
    void deleteCategory(Long id);
}
