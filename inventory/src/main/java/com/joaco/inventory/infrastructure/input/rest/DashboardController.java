package com.joaco.inventory.infrastructure.input.rest;


import com.joaco.inventory.domain.model.ChartData;
import com.joaco.inventory.domain.port.in.DashboardServicePort;
import com.joaco.inventory.domain.model.DashboardStats;
import com.joaco.inventory.infrastructure.input.rest.mapper.ProductMapper;
import com.joaco.inventory.infrastructure.input.rest.model.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final DashboardServicePort dashboardServicePort;
    private final ProductMapper productMapper;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getStats() {
        return ResponseEntity.ok(dashboardServicePort.getStats());
    }

    @GetMapping("/chart")
    public ResponseEntity<List<ChartData>> getChartData(){
        return ResponseEntity.ok(dashboardServicePort.getProductsByCategory());
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductResponse>> getLowStock(){
        return ResponseEntity.ok(
                dashboardServicePort.getLowStockProducts().stream().map(productMapper :: toResponse).toList()
        );
    }

    @GetMapping("/pie-chart")
    public ResponseEntity<List<ChartData>> getPieChartData(){
        return ResponseEntity.ok(dashboardServicePort.getInventoryValueByCategory());
    }

    @GetMapping("/products-by-price")
    public ResponseEntity<List<ProductResponse>> getProductsByPrice(
            @RequestParam(defaultValue = "desc") String sort
    ){
        return ResponseEntity.ok(
                dashboardServicePort.getAllProductsSortedByPrice(sort).stream()
                        .map(productMapper :: toResponse).toList()
        );
    }
}
