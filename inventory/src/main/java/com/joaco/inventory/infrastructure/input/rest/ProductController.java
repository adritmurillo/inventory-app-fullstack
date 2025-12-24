package com.joaco.inventory.infrastructure.input.rest;


import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.port.in.ProductServicePort;
import com.joaco.inventory.infrastructure.input.rest.mapper.ProductMapper;
import com.joaco.inventory.infrastructure.input.rest.model.ProductRequest;
import com.joaco.inventory.infrastructure.input.rest.model.ProductResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    private final ProductServicePort productServicePort;
    private final ProductMapper mapper;

    @PostMapping
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest productRequest) {
        Product domain = mapper.toDomain(productRequest);
        Product saved = productServicePort.createProduct(domain);
        return new ResponseEntity<>(mapper.toResponse(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update
            (
                    @PathVariable Long id,
                    @Valid
                    @RequestBody ProductRequest request
            ){
        Product domain = mapper.toDomain(request);
        Product updated = productServicePort.updateProduct(id, domain);
        return ResponseEntity.ok(mapper.toResponse(updated));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAll(){
        List<ProductResponse> responses = productServicePort.getAllProducts().stream()
                .map(mapper :: toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable Long id){
        Product domain = productServicePort.getProduct(id);
        return ResponseEntity.ok(mapper.toResponse(domain));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        productServicePort.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
