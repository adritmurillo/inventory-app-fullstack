package com.joaco.inventory.infrastructure.output.persistence.mapper;

import com.joaco.inventory.domain.model.Sale;
import com.joaco.inventory.domain.model.SaleDetail;
import com.joaco.inventory.infrastructure.output.persistence.entity.SaleDetailEntity;
import com.joaco.inventory.infrastructure.output.persistence.entity.SaleEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SalePersistenceMapper {
    public Sale toDomain(SaleEntity entity) {
        if (entity == null) return null;
        return Sale.builder()
                .id(entity.getId())
                .date(entity.getDate())
                .total(entity.getTotal())
                .userId(entity.getUser().getId())
                .items(toDomainList(entity.getItems()))
                .build();
    }
    private List<SaleDetail> toDomainList(List<SaleDetailEntity> items) {
        return items.stream().map(item -> SaleDetail.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .subtotal(item.getSubtotal())
                .build()).collect(Collectors.toList());
    }
}
