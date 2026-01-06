import { apiClient } from "./apiClient";

export const getAllProducts = async () => {
    const response = await apiClient.get("/products", { params: { page: 0, size: 1000 } });
    const data = response.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    return [];
};
