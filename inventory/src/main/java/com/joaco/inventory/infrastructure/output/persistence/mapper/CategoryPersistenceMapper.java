package com.joaco.inventory.infrastructure.output.persistence.mapper;

import com.joaco.inventory.domain.model.Category;
import com.joaco.inventory.infrastructure.output.persistence.entity.CategoryEntity;
import org.springframework.stereotype.Component;

@Component
public class CategoryPersistenceMapper {
    public Category toDomain(CategoryEntity entity) {
        if (entity == null) return null;

        return Category.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .build();
    }

    public CategoryEntity toEntity(Category domain) {
        if (domain == null) return null;

        return new CategoryEntity(
                domain.getId(),
                domain.getName(),
                domain.getDescription()
        );
    }
}