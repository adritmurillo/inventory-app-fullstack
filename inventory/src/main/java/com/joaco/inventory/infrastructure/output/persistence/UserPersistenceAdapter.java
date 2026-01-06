package com.joaco.inventory.infrastructure.output.persistence;

import com.joaco.inventory.domain.model.User;
import com.joaco.inventory.domain.port.out.UserRepositoryPort;
import com.joaco.inventory.infrastructure.output.persistence.mapper.UserPersistenceMapper;
import com.joaco.inventory.infrastructure.output.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserPersistenceAdapter implements UserRepositoryPort {

    private final UserJpaRepository userJpaRepository;
    private final UserPersistenceMapper userPersistenceMapper;

    @Override
    public Optional<User> findByUsername(String username) {
        return userJpaRepository.findByUsername(username)
                .map(userPersistenceMapper::toDomain);
    }
}