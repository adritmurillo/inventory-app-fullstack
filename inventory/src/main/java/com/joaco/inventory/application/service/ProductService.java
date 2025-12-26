package com.joaco.inventory.application.service;

import com.joaco.inventory.domain.model.Category;
import com.joaco.inventory.domain.model.CustomPage;
import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.model.ProductFilter;
import com.joaco.inventory.domain.port.in.ProductServicePort;
import com.joaco.inventory.domain.port.out.CategoryRepositoryPort;
import com.joaco.inventory.domain.port.out.ProductRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService implements ProductServicePort {

    private final ProductRepositoryPort productRepositoryPort;
    private final CategoryRepositoryPort categoryRepositoryPort;

    @Override
    public Product createProduct(Product product) {
        this.assignCategoryIfPresent(product,product);
        return productRepositoryPort.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepositoryPort.findById(id).orElseThrow(
                () -> new RuntimeException("Product not found with id " + id)
        );

        existingProduct.updateName(product.getName());
        existingProduct.updateDescription(product.getDescription());
        existingProduct.updateMinStock(product.getMinStock());
        existingProduct.updateStock(product.getStock());
        existingProduct.updatePrice(product.getPrice());

        this.assignCategoryIfPresent(existingProduct, product);

        return productRepositoryPort.save(existingProduct);
    }

    private void assignCategoryIfPresent(Product target, Product source){
        if(source.getCategory() != null && source.getCategory().getId() != null){
            Long categoryId = source.getCategory().getId();
            Category realCategory = categoryRepositoryPort.findById(categoryId).orElseThrow(
                    () -> new RuntimeException("Category not found with id " + categoryId)
            );
            target.updateCategory(realCategory);
        }
    }

    @Override
    public Product getProduct(Long id) {
        return productRepositoryPort.findById(id).orElseThrow(
                () -> new RuntimeException("Product not found with id " + id)
        );
    }

    @Override
    public CustomPage<Product> getAllProducts(ProductFilter filter, int page, int size) {
        return productRepositoryPort.findAll(filter, page, size);
    }

    @Override
    public void deleteProduct(Long id) {
        if(!productRepositoryPort.findById(id).isPresent()){
            throw new RuntimeException("Product not found with id " + id);
        }
        productRepositoryPort.deleteById(id);
    }
}
