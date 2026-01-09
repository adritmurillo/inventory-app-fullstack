package com.joaco.inventory.domain.port.out;

import com.joaco.inventory.domain.model.Sale;

import java.time.LocalDateTime;
import java.util.List;

public interface SaleRepositoryPort {
    Sale save(Sale sale);
    List<Sale> findAll();
    List<Sale> findByDateBetween(LocalDateTime start, LocalDateTime end);
}
