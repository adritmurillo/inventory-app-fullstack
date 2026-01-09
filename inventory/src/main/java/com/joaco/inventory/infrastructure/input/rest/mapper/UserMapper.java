package com.joaco.inventory.infrastructure.input.rest.mapper;

import com.joaco.inventory.domain.model.User;
import com.joaco.inventory.infrastructure.input.rest.model.RegisterRequest;
import com.joaco.inventory.infrastructure.input.rest.model.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    public User toDomain(RegisterRequest request){
        return User.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .email(request.getEmail())
                .role(request.getRole() != null ? request.getRole().toUpperCase() : "EMPLOYEE")
                .build();
    }

    public UserResponse toResponse(User domain) {
        return UserResponse.builder()
                .id(domain.getId())
                .username(domain.getUsername())
                .email(domain.getEmail())
                .role(domain.getRole())
                .build();
    }
}