package com.joaco.inventory.domain.port.out;

import com.joaco.inventory.domain.model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductRepositoryPort {
    Product save(Product product);
    Optional<Product> findById(Long id);
    List<Product> findAll();
    void deleteById(Long id);
}
