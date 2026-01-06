package com.joaco.inventory.domain.port.out;

import com.joaco.inventory.domain.model.Sale;

public interface SaleRepositoryPort {
    Sale save(Sale sale);
}
