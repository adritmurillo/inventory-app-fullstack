package com.joaco.inventory.infrastructure.configuration.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitingService {
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    private static final int LOGIN_MAX_ATTEMPTS = 5;
    private static final Duration LOGIN_REFILL_DURATION = Duration.ofMinutes(1);

    public Bucket resolveBucket(String key) {
        return buckets.computeIfAbsent(key, this::createLoginBucket);
    }

    private Bucket createLoginBucket(String key) {
        Bandwidth limit = Bandwidth.classic(
                LOGIN_MAX_ATTEMPTS,
                Refill.greedy(LOGIN_MAX_ATTEMPTS, LOGIN_REFILL_DURATION)
        );
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }

    public boolean tryConsume(String key) {
        return resolveBucket(key).tryConsume(1);
    }

    public long getWaitTimeInSeconds(String key) {
        return resolveBucket(key)
                .estimateAbilityToConsume(1)
                .getNanosToWaitForRefill() / 1_000_000_000;
    }
}

