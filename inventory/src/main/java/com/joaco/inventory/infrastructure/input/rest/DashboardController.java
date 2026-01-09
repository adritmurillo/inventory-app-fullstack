package com.joaco.inventory.infrastructure.input.rest;

import com.joaco.inventory.domain.model.ChartData;
import com.joaco.inventory.domain.model.DashboardFilter;
import com.joaco.inventory.domain.port.in.DashboardServicePort;
import com.joaco.inventory.infrastructure.input.rest.mapper.DashboardMapper;
import com.joaco.inventory.infrastructure.input.rest.mapper.ProductMapper;
import com.joaco.inventory.infrastructure.input.rest.model.DashboardResponse;
import com.joaco.inventory.infrastructure.input.rest.model.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final DashboardServicePort dashboardServicePort;
    private final ProductMapper productMapper;
    private final DashboardMapper dashboardMapper;

    @GetMapping("/stats")
    public ResponseEntity<DashboardResponse> getStats(
            @RequestParam(defaultValue = "day") String period,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        DashboardFilter filter = buildFilter(period, from, to, null);
        return ResponseEntity.ok(dashboardMapper.toResponse(dashboardServicePort.getStats(filter)));
    }

    @GetMapping("/chart")
    public ResponseEntity<List<ChartData>> getChartData(
            @RequestParam(defaultValue = "day") String period,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        DashboardFilter filter = buildFilter(period, from, to, null);
        return ResponseEntity.ok(dashboardServicePort.getProductsByCategory(filter));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductResponse>> getLowStock(
            @RequestParam(defaultValue = "day") String period,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        DashboardFilter filter = buildFilter(period, from, to, null);
        return ResponseEntity.ok(
                dashboardServicePort.getLowStockProducts(filter).stream()
                        .map(productMapper::toResponse).toList()
        );
    }

    @GetMapping("/pie-chart")
    public ResponseEntity<List<ChartData>> getPieChartData(
            @RequestParam(defaultValue = "day") String period,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        DashboardFilter filter = buildFilter(period, from, to, null);
        return ResponseEntity.ok(dashboardServicePort.getInventoryValueByCategory(filter));
    }


    @GetMapping("/products-by-price")
    public ResponseEntity<List<ProductResponse>> getProductsByPrice(
            @RequestParam(defaultValue = "day") String period,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @RequestParam(defaultValue = "desc") String sort
    ) {
        DashboardFilter filter = buildFilter(period, from, to, sort);
        return ResponseEntity.ok(
                dashboardServicePort.getAllProductsSortedByPrice(filter).stream()
                        .map(productMapper::toResponse).toList()
        );
    }

    private DashboardFilter buildFilter(String period, LocalDate from, LocalDate to, String sort) {
        return DashboardFilter.builder()
                .period(period != null ? period : "day")
                .from(from)
                .to(to)
                .sort(sort != null ? sort : "desc")
                .build();
    }
}
