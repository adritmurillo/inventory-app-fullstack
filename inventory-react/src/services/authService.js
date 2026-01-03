import { apiClient, TOKEN_KEY } from "./apiClient";

export const login = async (username, password) => {
    const response = await apiClient.post("/auth/login", { username, password });
    if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
    }
    return response.data;
};

export const register = async (userData) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);