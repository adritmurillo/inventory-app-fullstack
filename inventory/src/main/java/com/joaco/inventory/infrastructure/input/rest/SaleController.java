package com.joaco.inventory.infrastructure.input.rest;

import com.joaco.inventory.domain.model.Sale;
import com.joaco.inventory.domain.model.SaleDetail;
import com.joaco.inventory.domain.port.in.SaleServicePort;
import com.joaco.inventory.infrastructure.input.rest.mapper.SaleMapper;
import com.joaco.inventory.infrastructure.input.rest.model.SaleRequest;
import com.joaco.inventory.infrastructure.input.rest.model.SaleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sales")
public class SaleController {
    private final SaleServicePort saleServicePort;
    private final SaleMapper saleMapper;

    @PostMapping
    public ResponseEntity<SaleResponse> createSale(@RequestBody SaleRequest request){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        List<SaleDetail> items = saleMapper.toDomainList(request);

        Sale createdSale = saleServicePort.createSale(items, username);

        return ResponseEntity.ok(saleMapper.toResponse(createdSale));
    }
}
