package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.infrastructure.output.persistence.entity.UserEntity;
import java.util.List;

public interface UserServicePort {
    List<UserEntity> findAll();
    UserEntity createUser(UserEntity user);
    void deleteUser(Long id);
}