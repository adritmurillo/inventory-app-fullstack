package com.joaco.inventory.infrastructure.input.rest;

import com.joaco.inventory.domain.model.Category;
import com.joaco.inventory.domain.port.in.CategoryServicePort;
import com.joaco.inventory.infrastructure.input.rest.mapper.CategoryMapper;
import com.joaco.inventory.infrastructure.input.rest.model.CategoryRequest;
import com.joaco.inventory.infrastructure.input.rest.model.CategoryResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    private final CategoryServicePort servicePort;
    private final CategoryMapper mapper;

    @PostMapping
    public ResponseEntity<CategoryResponse> create(
            @Valid
            @RequestBody CategoryRequest request
    ){
        Category domain = mapper.toDomain(request);
        Category newCategory = servicePort.createCategory(domain);
        return new ResponseEntity<>(mapper.toResponse(newCategory), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAll(){
        List<CategoryResponse> list = servicePort.getAllCategories().stream()
                .map(mapper :: toResponse)
                .toList();
        return ResponseEntity.ok(list);
    }
}
