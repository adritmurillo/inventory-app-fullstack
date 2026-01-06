package com.joaco.inventory.domain.port.out;

import com.joaco.inventory.domain.model.Supply;

import java.util.List;

public interface SupplyRepositoryPort {
    Supply save(Supply supply);
    List<Supply> findAll();
}
