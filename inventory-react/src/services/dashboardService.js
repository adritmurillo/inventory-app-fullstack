import { apiClient } from "./apiClient";

export const getDashboardStats = async (params = {}) => {
    const response = await apiClient.get("/dashboard/stats", { params });
    return response.data;
};

export const getChartData = async (params = {}) => {
    const response = await apiClient.get("/dashboard/chart", { params });
    return response.data;
};

export const getLowStockProducts = async (params = {}) => {
    const response = await apiClient.get("/dashboard/low-stock", { params });
    return response.data;
};

export const getPieChartData = async (params = {}) => {
    const response = await apiClient.get("/dashboard/pie-chart", { params });
    return response.data;
};

export const getProductsByPrice = async (sort = "desc", params = {}) => {
    const response = await apiClient.get("/dashboard/products-by-price", { params: { ...params, sort } });
    return response.data;
};
