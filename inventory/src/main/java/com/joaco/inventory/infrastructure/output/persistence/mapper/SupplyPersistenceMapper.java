package com.joaco.inventory.infrastructure.output.persistence.mapper;

import com.joaco.inventory.domain.model.Supply;
import com.joaco.inventory.domain.model.SupplyDetail;
import com.joaco.inventory.infrastructure.output.persistence.entity.SupplyEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SupplyPersistenceMapper {

    public Supply toDomain(SupplyEntity entity) {
        if (entity == null) return null;

        List<SupplyDetail> itemsList = entity.getItems().stream()
                .map(item -> SupplyDetail.builder()
                        .id(item.getId())
                        .productId(item.getProduct().getId())
                        .quantity(item.getQuantity())
                        .unitCost(item.getUnitCost())
                        .subtotal(item.getSubtotal())
                        .build())
                .collect(Collectors.toList());

        return Supply.builder()
                .id(entity.getId())
                .date(entity.getDate())
                .total(entity.getTotal())
                .userId(entity.getUser().getId())
                .username(entity.getUser().getUsername())
                .items(itemsList)
                .build();
    }
}