package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.Supply;
import com.joaco.inventory.domain.model.SupplyDetail;

import java.util.List;


public interface SupplyServicePort {
    Supply createSupply(List<SupplyDetail>items, String username);
    List<Supply> getAllSupplies();
}
