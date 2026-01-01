package com.joaco.inventory.domain.port.out;

import com.joaco.inventory.domain.model.CustomPage;
import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.model.ProductFilter;

import java.util.List;
import java.util.Optional;

public interface ProductRepositoryPort {
    Product save(Product product);
    Optional<Product> findById(Long id);
    CustomPage<Product> findAll(ProductFilter filter, int page, int size);
    List<Product> findAll();
    List<Product> findAllSortedByPrice(String direction);
    void deleteById(Long id);
}
