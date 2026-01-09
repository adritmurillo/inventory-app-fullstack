package com.joaco.inventory.domain.port.out;

import com.joaco.inventory.domain.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryPort {
    List<User> findAll();
    Optional<User> findByUsername(String username);
    User save(User user);
    boolean existsById(Long id);
    void deleteById(Long id);
    Optional<User> findById(Long id);
    boolean existsByUsername(String username);
}
