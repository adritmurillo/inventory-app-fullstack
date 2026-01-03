package com.joaco.inventory.infrastructure.input.rest.mapper;

import com.joaco.inventory.infrastructure.input.rest.model.RegisterRequest;
import com.joaco.inventory.infrastructure.output.persistence.entity.Role;
import com.joaco.inventory.infrastructure.output.persistence.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    public UserEntity toEntity(RegisterRequest request) {
        return UserEntity.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(Role.ADMIN)
                .build();
    }
}