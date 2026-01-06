package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.Sale;
import com.joaco.inventory.domain.model.SaleDetail;

import java.util.List;

public interface SaleServicePort {
    Sale createSale(List<SaleDetail> items, String userId);
}
