package com.joaco.inventory.application.service;

import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.model.Sale;
import com.joaco.inventory.domain.model.SaleDetail;
import com.joaco.inventory.domain.model.User;
import com.joaco.inventory.domain.port.in.SaleServicePort;
import com.joaco.inventory.domain.port.out.ProductRepositoryPort;
import com.joaco.inventory.domain.port.out.SaleRepositoryPort;
import com.joaco.inventory.domain.port.out.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class SaleService implements SaleServicePort {

    private final SaleRepositoryPort saleRepositoryPort;
    private final ProductRepositoryPort productRepositoryPort;
    private final UserRepositoryPort userRepositoryPort;

    @Override
    public Sale createSale(List<SaleDetail> itemsRequest, String username) {

        User user = userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        Long userId = user.getId();

        List<SaleDetail> finalItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (SaleDetail itemRequest : itemsRequest) {
            Long productId = itemRequest.getProductId();
            Integer quantity = itemRequest.getQuantity();

            Product product = productRepositoryPort.findById(productId)
                    .orElseThrow(() -> new NoSuchElementException("Product not found with ID: " + productId));

            if (product.getStock() < quantity) {
                throw new IllegalArgumentException("Insufficient stock for: " + product.getName());
            }

            product.updateStock(product.getStock() - quantity);
            productRepositoryPort.save(product);

            BigDecimal unitPrice = product.getPrice();
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(quantity));

            total = total.add(subtotal);

            SaleDetail detail = SaleDetail.builder()
                    .productId(productId)
                    .quantity(quantity)
                    .unitPrice(unitPrice)
                    .subtotal(subtotal)
                    .build();

            finalItems.add(detail);
        }

        Sale sale = Sale.builder()
                .date(LocalDateTime.now())
                .userId(userId)
                .items(finalItems)
                .total(total)
                .build();

        return saleRepositoryPort.save(sale);
    }
}