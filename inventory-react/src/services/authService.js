import { apiClient, TOKEN_KEY } from "./apiClient";
import { jwtDecode } from "jwt-decode";

const stripBearerPrefix = (token) => token?.startsWith("Bearer ") ? token.slice(7) : token;

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

export const getUserRole = () => {
    const storedRole = localStorage.getItem("role");
    const token = stripBearerPrefix(getToken());

    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.role || decoded.roles?.[0] || storedRole || null;
        } catch (error) {
            console.error("Error decoding token for role", error);
        }
    }

    return storedRole || null;
};