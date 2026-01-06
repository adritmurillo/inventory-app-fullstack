package com.joaco.inventory.infrastructure.output.persistence;

import com.joaco.inventory.domain.model.Supply;
import com.joaco.inventory.domain.port.out.SupplyRepositoryPort;
import com.joaco.inventory.infrastructure.output.persistence.entity.ProductEntity;
import com.joaco.inventory.infrastructure.output.persistence.entity.SupplyDetailEntity;
import com.joaco.inventory.infrastructure.output.persistence.entity.SupplyEntity;
import com.joaco.inventory.infrastructure.output.persistence.entity.UserEntity;
import com.joaco.inventory.infrastructure.output.persistence.mapper.SupplyPersistenceMapper;
import com.joaco.inventory.infrastructure.output.persistence.repository.ProductJpaRepository;
import com.joaco.inventory.infrastructure.output.persistence.repository.SupplyJpaRepository;
import com.joaco.inventory.infrastructure.output.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SupplyPersistenceAdapter implements SupplyRepositoryPort {

    private final SupplyJpaRepository supplyJpaRepository;
    private final UserJpaRepository userJpaRepository;
    private final ProductJpaRepository productJpaRepository;
    private final SupplyPersistenceMapper supplyPersistenceMapper;

    @Override
    public Supply save(Supply supply) {
        UserEntity user = userJpaRepository.findById(supply.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SupplyEntity entity = SupplyEntity.builder()
                .date(supply.getDate())
                .total(supply.getTotal())
                .user(user)
                .build();

        supply.getItems().forEach(item -> {
            ProductEntity product = productJpaRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            entity.addDetail(SupplyDetailEntity.builder()
                    .product(product)
                    .quantity(item.getQuantity())
                    .unitCost(item.getUnitCost())
                    .subtotal(item.getSubtotal())
                    .build());
        });

        SupplyEntity saved = supplyJpaRepository.save(entity);

        return supplyPersistenceMapper.toDomain(saved);
    }

    @Override
    public List<Supply> findAll() {
        return supplyJpaRepository.findAll().stream()
                .map(supplyPersistenceMapper::toDomain)
                .collect(Collectors.toList());
    }
}