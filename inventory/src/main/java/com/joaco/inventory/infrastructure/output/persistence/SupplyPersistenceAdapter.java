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

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SupplyPersistenceAdapter implements SupplyRepositoryPort {

    private final SupplyJpaRepository supplyRepo;
    private final UserJpaRepository userRepo;
    private final ProductJpaRepository productRepo;
    private final SupplyPersistenceMapper supplyPerMapper;

    @Override
    public Supply save(Supply supply) {
        UserEntity user = userRepo.findById(supply.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SupplyEntity entity = SupplyEntity.builder()
                .date(supply.getDate())
                .total(supply.getTotal())
                .user(user)
                .build();

        supply.getItems().forEach(item -> {
            ProductEntity product = productRepo.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            entity.addDetail(SupplyDetailEntity.builder()
                    .product(product)
                    .quantity(item.getQuantity())
                    .unitCost(item.getUnitCost())
                    .subtotal(item.getSubtotal())
                    .build());
        });

        SupplyEntity saved = supplyRepo.save(entity);

        return supplyPerMapper.toDomain(saved);
    }

    @Override
    public List<Supply> findAll() {
        return supplyRepo.findAll().stream()
                .map(supplyPerMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Supply> findByDateBetween(LocalDateTime start, LocalDateTime end) {
        return supplyRepo.findByDateBetween(start,end).stream()
                .map(supplyPerMapper :: toDomain)
                .collect(Collectors.toList());
    }
}