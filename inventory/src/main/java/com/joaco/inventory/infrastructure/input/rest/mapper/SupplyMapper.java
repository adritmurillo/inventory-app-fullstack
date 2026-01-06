package com.joaco.inventory.infrastructure.input.rest.mapper;

import com.joaco.inventory.domain.model.Supply;
import com.joaco.inventory.domain.model.SupplyDetail;
import com.joaco.inventory.infrastructure.input.rest.model.SupplyDetailResponse;
import com.joaco.inventory.infrastructure.input.rest.model.SupplyRequest;
import com.joaco.inventory.infrastructure.input.rest.model.SupplyResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SupplyMapper {
    public List<SupplyDetail> toDomainList(SupplyRequest request) {
        return request.getItems().stream()
                .map(item -> SupplyDetail.builder()
                        .productId(item.getProductId())
                        .quantity(item.getQuantity())
                        .unitCost(item.getUnitCost())
                        .build())
                .collect(Collectors.toList());
    }

    public SupplyResponse toResponse(Supply domain) {
        if (domain == null) return null;

        return SupplyResponse.builder()
                .id(domain.getId())
                .date(domain.getDate())
                .total(domain.getTotal())
                .username(domain.getUsername())
                .items(toResponseList(domain.getItems()))
                .build();
    }

    private List<SupplyDetailResponse> toResponseList(List<SupplyDetail> items) {
        return items.stream()
                .map(item -> SupplyDetailResponse.builder()
                        .productId(item.getProductId())
                        .quantity(item.getQuantity())
                        .unitCost(item.getUnitCost())
                        .subtotal(item.getSubtotal())
                        .build())
                .collect(Collectors.toList());
    }
}