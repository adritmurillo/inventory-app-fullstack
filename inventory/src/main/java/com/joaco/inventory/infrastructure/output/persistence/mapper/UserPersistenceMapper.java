package com.joaco.inventory.infrastructure.output.persistence.mapper;

import com.joaco.inventory.domain.model.User;
import com.joaco.inventory.infrastructure.output.persistence.entity.Role;
import com.joaco.inventory.infrastructure.output.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserPersistenceMapper {
    public User toDomain(UserEntity entity) {
        if (entity == null) return null;
        return User.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .email(entity.getEmail())
                .password(entity.getPassword())
                .role(entity.getRole().name())
                .build();
    }

    public UserEntity toEntity(User domain) {
        if (domain == null) return null;

        Role role = Role.EMPLOYEE;
        if (domain.getRole() != null) {
            try {
                role = Role.valueOf(domain.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                role = Role.EMPLOYEE;
            }
        }

        return UserEntity.builder()
                .id(domain.getId())
                .username(domain.getUsername())
                .password(domain.getPassword())
                .email(domain.getEmail())
                .role(role)
                .build();
    }
}