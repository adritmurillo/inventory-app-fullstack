package com.joaco.inventory.domain.port.out;

import com.joaco.inventory.domain.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryRepositoryPort {
    Optional<Category> findById(Long id);
    Category save(Category category);
    List<Category> findAll();
    void deleteById(Long id);
}
