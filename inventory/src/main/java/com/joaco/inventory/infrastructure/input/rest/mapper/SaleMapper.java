package com.joaco.inventory.infrastructure.input.rest.mapper;

import com.joaco.inventory.domain.model.Sale;
import com.joaco.inventory.domain.model.SaleDetail;
import com.joaco.inventory.infrastructure.input.rest.model.SaleDetailResponse;
import com.joaco.inventory.infrastructure.input.rest.model.SaleRequest;
import com.joaco.inventory.infrastructure.input.rest.model.SaleResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SaleMapper {
    public List<SaleDetail> toDomainList(SaleRequest request) {
        return request.getItems().stream()
                .map(item -> SaleDetail.builder()
                        .productId(item.getProductId())
                        .quantity(item.getQuantity())
                        .build())
                .collect(Collectors.toList());
    }

    public SaleResponse toResponse(Sale domain) {
        if (domain == null) return null;

        return SaleResponse.builder()
                .id(domain.getId())
                .date(domain.getDate())
                .total(domain.getTotal())
                .items(toResponseList(domain.getItems()))
                .build();
    }

    private List<SaleDetailResponse> toResponseList(List<SaleDetail> items) {
        return items.stream()
                .map(item -> SaleDetailResponse.builder()
                        .productId(item.getProductId())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .subtotal(item.getSubtotal())
                        .build())
                .collect(Collectors.toList());
    }
}