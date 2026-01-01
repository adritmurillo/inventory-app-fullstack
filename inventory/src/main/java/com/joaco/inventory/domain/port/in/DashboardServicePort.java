package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.ChartData;
import com.joaco.inventory.domain.model.DashboardStats;
import com.joaco.inventory.domain.model.Product;

import java.util.List;

public interface DashboardServicePort {
    DashboardStats getStats();
    List<ChartData> getProductsByCategory();
    List<Product> getLowStockProducts();
    List<ChartData> getInventoryValueByCategory();
}
