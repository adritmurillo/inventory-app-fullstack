package com.joaco.inventory.infrastructure.input.rest.mapper;

import com.joaco.inventory.infrastructure.input.rest.model.RegisterRequest;
import com.joaco.inventory.infrastructure.input.rest.model.UserResponse;
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
        Role role = Role.EMPLOYEE;
        if(request.getRole() !=null){
            try{
                role = Role.valueOf(request.getRole().toUpperCase());
            } catch (IllegalArgumentException e){
                role = Role.EMPLOYEE;
            }
        }

        return UserEntity.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(role)
                .build();
    }

    public UserResponse toResponse(UserEntity entity){
        return UserResponse.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .email(entity.getEmail())
                .role(entity.getRole().name())
                .build();
    }
}