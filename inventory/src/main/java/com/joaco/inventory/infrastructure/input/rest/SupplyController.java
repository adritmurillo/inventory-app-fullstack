package com.joaco.inventory.infrastructure.input.rest;

import com.joaco.inventory.domain.model.Supply;
import com.joaco.inventory.domain.model.SupplyDetail;
import com.joaco.inventory.domain.port.in.SupplyServicePort;
import com.joaco.inventory.infrastructure.input.rest.mapper.SupplyMapper;
import com.joaco.inventory.infrastructure.input.rest.model.SupplyRequest;
import com.joaco.inventory.infrastructure.input.rest.model.SupplyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/supplies")
@RequiredArgsConstructor
public class SupplyController {

    private final SupplyServicePort supplyServicePort;
    private final SupplyMapper supplyMapper;

    @PostMapping
    public ResponseEntity<SupplyResponse> createSupply(@RequestBody SupplyRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        List<SupplyDetail> items = supplyMapper.toDomainList(request);
        Supply createdSupply = supplyServicePort.createSupply(items, username);

        return ResponseEntity.ok(supplyMapper.toResponse(createdSupply));
    }

    @GetMapping
    public ResponseEntity<List<SupplyResponse>> getAllSupplies() {
        List<Supply> supplies = supplyServicePort.getAllSupplies();

        List<SupplyResponse> response = supplies.stream()
                .map(supplyMapper::toResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}