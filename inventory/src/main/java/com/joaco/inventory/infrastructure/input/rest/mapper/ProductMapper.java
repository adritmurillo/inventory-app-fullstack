package com.joaco.inventory.infrastructure.input.rest.mapper;

import com.joaco.inventory.domain.model.Category;
import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.infrastructure.input.rest.model.ProductRequest;
import com.joaco.inventory.infrastructure.input.rest.model.ProductResponse;
import org.springframework.stereotype.Component;


@Component
public class ProductMapper {
    public Product toDomain(ProductRequest request){
        Category category = null;
        if (request.getCategoryId() != null){
            category = Category.builder()
                    .id(request.getCategoryId())
                    .build();
        }

        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .minStock(request.getMinStock())
                .category(category)
                .build();
    }

    public ProductResponse toResponse(Product domain){
        return ProductResponse.builder()
                .id(domain.getId())
                .name(domain.getName())
                .description(domain.getDescription())
                .price(domain.getPrice())
                .stock(domain.getStock())
                .minStock(domain.getMinStock())
                .categoryId(domain.getCategory() != null ? domain.getCategory().getId() : null)
                .categoryName(domain.getCategory() != null ? domain.getCategory().getName() : null)
                .build();
    }
}
