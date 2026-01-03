package com.joaco.inventory.infrastructure.input.rest;

import com.joaco.inventory.infrastructure.configuration.security.JwtService;
import com.joaco.inventory.infrastructure.configuration.security.SecurityUser;
import com.joaco.inventory.infrastructure.input.rest.mapper.UserMapper;
// 👇 Nuevos imports
import com.joaco.inventory.infrastructure.input.rest.model.LoginRequest;
import com.joaco.inventory.infrastructure.input.rest.model.RegisterRequest;
import com.joaco.inventory.infrastructure.output.persistence.entity.UserEntity;
import com.joaco.inventory.infrastructure.output.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserJpaRepository userJpaRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userJpaRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El usuario ya existe"));
        }

        UserEntity user = userMapper.toEntity(request);
        userJpaRepository.save(user);

        String jwtToken = jwtService.generateToken(new SecurityUser(user));

        return ResponseEntity.ok(Map.of("token", jwtToken));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserEntity user = userJpaRepository.findByUsername(request.getUsername())
                .orElseThrow();

        String jwtToken = jwtService.generateToken(new SecurityUser(user));

        return ResponseEntity.ok(Map.of("token", jwtToken));
    }
}