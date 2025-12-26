package com.joaco.inventory.infrastructure.output.persistence;

import com.joaco.inventory.domain.model.CustomPage;
import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.model.ProductFilter;
import com.joaco.inventory.domain.port.out.ProductRepositoryPort;
import com.joaco.inventory.infrastructure.output.persistence.entity.ProductEntity;
import com.joaco.inventory.infrastructure.output.persistence.mapper.ProductPersistenceMapper;
import com.joaco.inventory.infrastructure.output.persistence.repository.ProductJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import jakarta.persistence.criteria.Predicate;

@Repository
@RequiredArgsConstructor
public class ProductPersistenceAdapter implements ProductRepositoryPort {
    private final ProductJpaRepository repository;
    private final ProductPersistenceMapper mapper;

    @Override
    public Product save(Product product) {
        var entity = mapper.toEntity(product);
        var savedEntity = repository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return repository.findById(id).map(mapper::toDomain);
    }

    @Override
    public CustomPage<Product> findAll(ProductFilter filter,int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        Specification<ProductEntity> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if(filter.getName() !=null && !filter.getName().isEmpty()){
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")),
                        "%" + filter.getName().toLowerCase() + "%"
                ));
            }

            if(filter.getCategoryId() !=null){
                predicates.add(criteriaBuilder.equal(
                        root.get("category").get("id"),
                        filter.getCategoryId()
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };


        Page<ProductEntity> productPage = repository.findAll(spec, pageRequest);
        List<Product> products = productPage.getContent().stream().map(mapper :: toDomain)
                .toList();

        return CustomPage.<Product>builder()
                .content(products)
                .pageNumber(productPage.getNumber())
                .pageSize(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .last(productPage.isLast())
                .build();
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
