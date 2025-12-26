package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.CustomPage;
import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.model.ProductFilter;

import java.util.List;

public interface ProductServicePort {
    Product createProduct(Product product);
    Product updateProduct(Long id, Product product);
    Product getProduct(Long id);
    CustomPage<Product> getAllProducts(ProductFilter filter, int page, int size);
    void deleteProduct(Long id);
}
