package com.joaco.inventory.infrastructure.output.persistence;

import com.joaco.inventory.domain.model.Category;
import com.joaco.inventory.domain.port.out.CategoryRepositoryPort;
import com.joaco.inventory.infrastructure.output.persistence.mapper.CategoryPersistenceMapper;
import com.joaco.inventory.infrastructure.output.persistence.repository.CategoryJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CategoryPersistenceAdapter implements CategoryRepositoryPort {
    private final CategoryJpaRepository repo;
    private final CategoryPersistenceMapper mapper;

    @Override
    public Optional<Category> findById(Long id) {
        return repo.findById(id).map(mapper :: toDomain);
    }

    @Override
    public Category save(Category category) {
        var entity = mapper.toEntity(category);
        var saved = repo.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public List<Category> findAll() {
        return repo.findAll().stream()
                .map(mapper :: toDomain)
                .toList();
    }

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
