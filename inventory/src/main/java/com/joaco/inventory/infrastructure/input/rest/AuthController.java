package com.joaco.inventory.infrastructure.input.rest;

import com.joaco.inventory.domain.exception.RateLimitExceededException;
import com.joaco.inventory.infrastructure.configuration.security.JwtService;
import com.joaco.inventory.infrastructure.configuration.security.RateLimitingService;
import com.joaco.inventory.infrastructure.configuration.security.SecurityUser;
import com.joaco.inventory.infrastructure.input.rest.model.LoginRequest;
import com.joaco.inventory.infrastructure.output.persistence.entity.UserEntity;
import com.joaco.inventory.infrastructure.output.persistence.repository.UserJpaRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final UserJpaRepository userJpaRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RateLimitingService rateLimitingService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest
    ) {
        String clientIp = getClientIp(httpRequest);
        String rateLimitKey = "login:" + clientIp;

        if (!rateLimitingService.tryConsume(rateLimitKey)) {
            long waitTime = rateLimitingService.getWaitTimeInSeconds(rateLimitKey);
            log.warn("Rate limit exceeded for IP: {}", clientIp);
            throw new RateLimitExceededException(waitTime);
        }

        log.info("Login attempt for user: {} from IP: {}", request.getUsername(), clientIp);

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserEntity user = userJpaRepository.findByUsername(request.getUsername())
                .orElseThrow();

        String jwtToken = jwtService.generateToken(new SecurityUser(user));

        log.info("Login successful for user: {}", request.getUsername());

        return ResponseEntity.ok(Map.of("token", jwtToken));
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}