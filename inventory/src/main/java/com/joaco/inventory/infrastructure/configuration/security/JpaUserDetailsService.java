package com.joaco.inventory.infrastructure.configuration.security;

import com.joaco.inventory.infrastructure.output.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class JpaUserDetailsService implements UserDetailsService {
    private final UserJpaRepository userJpaRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userJpaRepository.findByUsername(username)
                .map(SecurityUser :: new)
                .orElseThrow(
                        () -> new UsernameNotFoundException("User not found: " +username)
                );
    }
}
