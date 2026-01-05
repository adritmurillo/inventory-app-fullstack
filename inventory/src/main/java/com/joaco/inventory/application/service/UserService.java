package com.joaco.inventory.application.service;

import com.joaco.inventory.domain.port.in.UserServicePort;
import com.joaco.inventory.infrastructure.output.persistence.entity.UserEntity;
import com.joaco.inventory.infrastructure.output.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserServicePort {

    private final UserJpaRepository userJpaRepository;

    @Override
    public List<UserEntity> findAll() {
        return userJpaRepository.findAll();
    }

    @Override
    public UserEntity createUser(UserEntity user) {
        if (userJpaRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }
        return userJpaRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userJpaRepository.existsById(id)) {
            throw new IllegalArgumentException("Could not found user with id: " + id);
        }
        userJpaRepository.deleteById(id);
    }
}