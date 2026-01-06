import { apiClient } from "./apiClient";

export const createSale = async (cartItems) => {
    const payload = {
        items: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }))
    };

    const response = await apiClient.post("/sales", payload);
    return response.data;
};
