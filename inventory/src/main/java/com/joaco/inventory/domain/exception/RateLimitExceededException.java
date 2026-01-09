package com.joaco.inventory.domain.exception;

public class RateLimitExceededException extends RuntimeException {

    private final long waitTimeSeconds;

    public RateLimitExceededException(long waitTimeSeconds) {
        super(String.format("Too many attempts. Please wait %d seconds.", waitTimeSeconds));
        this.waitTimeSeconds = waitTimeSeconds;
    }

    public long getWaitTimeSeconds() {
        return waitTimeSeconds;
    }
}

