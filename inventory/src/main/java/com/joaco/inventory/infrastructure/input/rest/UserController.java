package com.joaco.inventory.infrastructure.input.rest;


import com.joaco.inventory.domain.port.in.UserServicePort;
import com.joaco.inventory.infrastructure.input.rest.mapper.UserMapper;
import com.joaco.inventory.infrastructure.input.rest.model.RegisterRequest;
import com.joaco.inventory.infrastructure.input.rest.model.UserResponse;
import com.joaco.inventory.infrastructure.output.persistence.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserServicePort service;
    private final UserMapper mapper;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers(){
        List<UserEntity> users =service.findAll();

        List<UserResponse> response = users.stream().map(mapper :: toResponse).toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest request) {
        try {
            UserEntity user = mapper.toEntity(request);
            UserEntity savedUser = service.createUser(user);
            return ResponseEntity.ok(mapper.toResponse(savedUser));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            service.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
