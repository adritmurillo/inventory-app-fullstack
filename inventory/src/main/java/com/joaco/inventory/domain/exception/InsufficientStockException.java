package com.joaco.inventory.domain.exception;


public class InsufficientStockException extends BusinessValidationException {

    public InsufficientStockException(String productName, int requested, int available) {
        super(String.format("Insufficient stock for '%s'. Requested: %d, Available: %d",
                productName, requested, available));
    }
}

