import { apiClient } from "./apiClient";

export const createSupply = async (supplyItems) => {
    const payload = {
        items: supplyItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            unitCost: item.unitCost
        }))
    };

    const response = await apiClient.post("/supplies", payload);
    return response.data;
};

export const getAllSupplies = async () => {
    const response = await apiClient.get("/supplies");
    return response.data;
};
