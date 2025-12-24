package com.joaco.inventory.infrastructure.input.rest.mapper;

import com.joaco.inventory.domain.model.Category;
import com.joaco.inventory.infrastructure.input.rest.model.CategoryRequest;
import com.joaco.inventory.infrastructure.input.rest.model.CategoryResponse;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public Category toDomain(CategoryRequest request){
        return Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }
    public CategoryResponse toResponse(Category domain){
        return CategoryResponse.builder()
                .id(domain.getId())
                .name(domain.getName())
                .description(domain.getDescription())
                .build();
    }
}
