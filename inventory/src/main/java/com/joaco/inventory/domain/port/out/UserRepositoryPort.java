package com.joaco.inventory.domain.port.out;

import com.joaco.inventory.domain.model.User;

import java.util.Optional;

public interface UserRepositoryPort {
    Optional<User> findByUsername(String username);
}
