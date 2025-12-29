package com.joaco.inventory.infrastructure.input.rest;


import com.joaco.inventory.domain.model.CustomPage;
import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.model.ProductFilter;
import com.joaco.inventory.domain.port.in.ProductServicePort;
import com.joaco.inventory.infrastructure.input.rest.mapper.ProductMapper;
import com.joaco.inventory.infrastructure.input.rest.model.ProductRequest;
import com.joaco.inventory.infrastructure.input.rest.model.ProductResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    private final ProductServicePort productServicePort;
    private final ProductMapper mapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> create(
            @RequestPart("product") @Valid ProductRequest productRequest,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        Product domain = mapper.toDomain(productRequest);
        Product saved = productServicePort.createProduct(domain, image);
        return new ResponseEntity<>(mapper.toResponse(saved), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> update(
                    @PathVariable Long id,
                    @RequestPart("product") @Valid ProductRequest request,
                    @RequestPart(value = "image", required = false) MultipartFile image
            ){
        Product domain = mapper.toDomain(request);
        Product updated = productServicePort.updateProduct(id, domain, image);
        return ResponseEntity.ok(mapper.toResponse(updated));
    }

    @GetMapping
    public ResponseEntity<CustomPage<ProductResponse>> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        ProductFilter filter = ProductFilter.builder()
                .name(search)
                .categoryId(categoryId)
                .build();

        CustomPage<Product> domainPage = productServicePort.getAllProducts(filter, page, size);

        List<ProductResponse> responseContent = domainPage.getContent().stream().map(mapper :: toResponse)
                .toList();

        CustomPage<ProductResponse> responsePage = CustomPage.<ProductResponse>builder()
                .content(responseContent)
                .pageNumber(domainPage.getPageNumber())
                .pageSize(domainPage.getPageSize())
                .totalElements(domainPage.getTotalElements())
                .totalPages(domainPage.getTotalPages())
                .last(domainPage.isLast())
                .build();

        return ResponseEntity.ok(responsePage);
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
