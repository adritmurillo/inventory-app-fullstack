package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.Product;

import java.util.List;

public interface ProductServicePort {
    Product createProduct(Product product);
    Product updateProduct(Long id, Product product);
    Product getProduct(Long id);
    List<Product> getAllProducts();
    void deleteProduct(Long id);
}
