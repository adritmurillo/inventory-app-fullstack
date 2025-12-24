package com.joaco.inventory.infrastructure.output.persistence;

import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.port.out.ProductRepositoryPort;
import com.joaco.inventory.infrastructure.output.persistence.mapper.ProductPersistenceMapper;
import com.joaco.inventory.infrastructure.output.persistence.repository.ProductJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<Product> findAll() {
        return repository.findAll().stream().map(mapper :: toDomain).collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
