import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const TOKEN_KEY = "token";

const apiClient = axios.create({ baseURL: API_BASE_URL });

function parseJwt(token) {
    try {
        const base64 = token.split(".")[1]?.replace(/-/g, "+").replace(/_/g, "/");
        if (!base64) return null;
        const payload = JSON.parse(atob(base64));
        return payload;
    } catch (e) {
        return null;
    }
}

function isTokenExpired(token) {
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return true;
    const nowSeconds = Math.floor(Date.now() / 1000);
    return payload.exp < nowSeconds;
}

// Attach JWT if present
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auto-logout on 401 responses
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export { apiClient, API_BASE_URL, TOKEN_KEY, isTokenExpired };
