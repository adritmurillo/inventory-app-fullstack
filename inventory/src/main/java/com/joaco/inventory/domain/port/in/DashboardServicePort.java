package com.joaco.inventory.domain.port.in;

import com.joaco.inventory.domain.model.ChartData;
import com.joaco.inventory.domain.model.DashboardFilter;
import com.joaco.inventory.domain.model.DashboardStats;
import com.joaco.inventory.domain.model.Product;

import java.util.List;

public interface DashboardServicePort {
    DashboardStats getStats(DashboardFilter filter);
    List<ChartData> getProductsByCategory(DashboardFilter filter);
    List<Product> getLowStockProducts(DashboardFilter filter);
    List<ChartData> getInventoryValueByCategory(DashboardFilter filter);
    List<Product> getAllProductsSortedByPrice(DashboardFilter filter);
}
