package com.joaco.inventory.infrastructure.output.persistence;

import com.joaco.inventory.domain.model.Sale;
import com.joaco.inventory.domain.port.out.SaleRepositoryPort;
import com.joaco.inventory.infrastructure.output.persistence.entity.ProductEntity;
import com.joaco.inventory.infrastructure.output.persistence.entity.SaleDetailEntity;
import com.joaco.inventory.infrastructure.output.persistence.entity.SaleEntity;
import com.joaco.inventory.infrastructure.output.persistence.entity.UserEntity;
import com.joaco.inventory.infrastructure.output.persistence.mapper.SalePersistenceMapper;
import com.joaco.inventory.infrastructure.output.persistence.repository.ProductJpaRepository;
import com.joaco.inventory.infrastructure.output.persistence.repository.SaleJpaRepository;
import com.joaco.inventory.infrastructure.output.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SalePersistenceAdapter implements SaleRepositoryPort {
    private final SaleJpaRepository saleRepo;
    private final SalePersistenceMapper saleMapper;
    private final UserJpaRepository userRepo;
    private final ProductJpaRepository productRepo;

    @Override
    public Sale save(Sale sale) {
        UserEntity user = userRepo.findById(sale.getUserId()).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        SaleEntity saleEntity = SaleEntity.builder()
                .date(sale.getDate())
                .total(sale.getTotal())
                .user(user)
                .build();

        sale.getItems().forEach(itemModel -> {
            ProductEntity product = productRepo.findById(itemModel.getProductId())
                    .orElseThrow(()->new RuntimeException("Product not found"));

            SaleDetailEntity detailEntity = SaleDetailEntity.builder()
                    .product(product)
                    .quantity(itemModel.getQuantity())
                    .unitPrice(itemModel.getUnitPrice())
                    .subtotal(itemModel.getSubtotal())
                    .build();
            saleEntity.addDetail(detailEntity);
        });

        SaleEntity savedEntity = saleRepo.save(saleEntity);

        return saleMapper.toDomain(savedEntity);
    }

    @Override
    public List<Sale> findAll() {
        return saleRepo.findAll().stream()
                .map(saleMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Sale> findByDateBetween(LocalDateTime start, LocalDateTime end) {
        return saleRepo.findByDateBetween(start, end).stream()
                .map(saleMapper :: toDomain)
                .collect(Collectors.toList());
    }
}
