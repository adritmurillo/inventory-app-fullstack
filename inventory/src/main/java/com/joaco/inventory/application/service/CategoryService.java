package com.joaco.inventory.application.service;

import com.joaco.inventory.domain.model.Category;
import com.joaco.inventory.domain.port.in.CategoryServicePort;
import com.joaco.inventory.domain.port.out.CategoryRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService implements CategoryServicePort {
    private final CategoryRepositoryPort categoryRepositoryPort;


    @Override
    public Category createCategory(Category category) {
        return categoryRepositoryPort.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepositoryPort.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepositoryPort.findById(id).orElseThrow(
                () -> new RuntimeException("Category with id " + id + " not found")
        );
    }

    @Override
    public Category updateCategory(Long id, Category incomingCategoryData) {
        Category existingCategory = getCategoryById(id);

        existingCategory.updateName(incomingCategoryData.getName());
        existingCategory.updateDescription(incomingCategoryData.getDescription());

        return categoryRepositoryPort.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        if (categoryRepositoryPort.findById(id).isEmpty()) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        categoryRepositoryPort.deleteById(id);
    }
}
