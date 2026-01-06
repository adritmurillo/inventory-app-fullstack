package com.joaco.inventory.application.service;

import com.joaco.inventory.domain.model.Product;
import com.joaco.inventory.domain.model.Supply;
import com.joaco.inventory.domain.model.SupplyDetail;
import com.joaco.inventory.domain.model.User;
import com.joaco.inventory.domain.port.in.SupplyServicePort;
import com.joaco.inventory.domain.port.out.ProductRepositoryPort;
import com.joaco.inventory.domain.port.out.SupplyRepositoryPort;
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
public class SupplyService implements SupplyServicePort {

    private final SupplyRepositoryPort supplyRepositoryPort;
    private final ProductRepositoryPort productRepositoryPort;
    private final UserRepositoryPort userRepositoryPort;

    @Override
    public Supply createSupply(List<SupplyDetail> itemsRequest, String username) {

        User user = userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        List<SupplyDetail> finalItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (SupplyDetail itemRequest : itemsRequest) {
            Long productId = itemRequest.getProductId();
            Integer quantity = itemRequest.getQuantity();
            BigDecimal unitCost = itemRequest.getUnitCost() != null ? itemRequest.getUnitCost() : BigDecimal.ZERO;

            Product product = productRepositoryPort.findById(productId)
                    .orElseThrow(() -> new NoSuchElementException("Producto ID " + productId + " does not exist"));

            product.updateStock(product.getStock() + quantity);
            productRepositoryPort.save(product);

            BigDecimal subtotal = unitCost.multiply(BigDecimal.valueOf(quantity));
            total = total.add(subtotal);

            finalItems.add(SupplyDetail.builder()
                    .productId(productId)
                    .quantity(quantity)
                    .unitCost(unitCost)
                    .subtotal(subtotal)
                    .build());
        }

        Supply supply = Supply.builder()
                .date(LocalDateTime.now())
                .userId(user.getId())
                .items(finalItems)
                .total(total)
                .build();

        return supplyRepositoryPort.save(supply);
    }

    @Override
    public List<Supply> getAllSupplies() {
        return supplyRepositoryPort.findAll();
    }
}