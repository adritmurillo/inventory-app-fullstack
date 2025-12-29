package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.CustomPage;
import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.model.ProductFilter;
import org.springframework.web.multipart.MultipartFile;


public interface ProductServicePort {
    Product createProduct(Product product, MultipartFile image);
    Product updateProduct(Long id, Product product, MultipartFile image);
    Product getProduct(Long id);
    CustomPage<Product> getAllProducts(ProductFilter filter, int page, int size);
    void deleteProduct(Long id);
}
