package com.joaco.inventory.domain.exception;

public class DuplicateResourceException extends BusinessValidationException {

    public DuplicateResourceException(String message) {
        super(message);
    }

    public DuplicateResourceException(String resourceName, String identifier) {
        super(String.format("%s already exists: %s", resourceName, identifier));
    }
}

