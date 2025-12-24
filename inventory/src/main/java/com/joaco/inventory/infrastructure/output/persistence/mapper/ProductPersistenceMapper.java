package com.joaco.inventory.infrastructure.output.persistence.mapper;

import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.infrastructure.output.persistence.entity.ProductEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductPersistenceMapper {
    private final CategoryPersistenceMapper mapper;
    public Product toDomain(ProductEntity entity){
        if (entity == null) return null;
        return Product.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .stock(entity.getStock())
                .minStock(entity.getMinStock())
                .category(mapper.toDomain(entity.getCategory()))
                .build();
    }

    public ProductEntity toEntity(Product domain){
        if(domain == null) return null;
        ProductEntity entity = new ProductEntity();
        entity.setId(domain.getId());
        entity.setName(domain.getName());
        entity.setDescription(domain.getDescription());
        entity.setPrice(domain.getPrice());
        entity.setStock(domain.getStock());
        entity.setMinStock(domain.getMinStock());

        entity.setCategory(mapper.toEntity(domain.getCategory()));

        return entity;
    }

}
