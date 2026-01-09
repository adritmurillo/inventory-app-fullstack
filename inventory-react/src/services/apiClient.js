import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const TOKEN_KEY = "token";

const apiClient = axios.create({ baseURL: API_BASE_URL });

const stripBearerPrefix = (token) => token?.startsWith("Bearer ") ? token.slice(7) : token;

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
    const payload = parseJwt(stripBearerPrefix(token));
    if (!payload || !payload.exp) return true;
    const nowSeconds = Math.floor(Date.now() / 1000);
    return payload.exp < nowSeconds;
}

apiClient.interceptors.request.use((config) => {
    const storedToken = stripBearerPrefix(localStorage.getItem(TOKEN_KEY));
    if (storedToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${storedToken}`;
    }
    return config;
});

export class ApiError extends Error {
    constructor(status, message, fieldErrors = null, retryAfterSeconds = null) {
        super(message);
        this.status = status;
        this.fieldErrors = fieldErrors;
        this.retryAfterSeconds = retryAfterSeconds;
    }
}

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const data = error.response?.data || {};

        if (status === 401 && !error.config?.url?.includes("/auth/login")) {
            localStorage.removeItem(TOKEN_KEY);
            window.location.href = "/login";
        }

        if (status === 429) {
            const retryAfter = data.retryAfterSeconds || parseInt(error.response?.headers?.["retry-after"], 10) || 60;
            const apiError = new ApiError(429, data.message || "Too many requests. Please wait.", null, retryAfter);
            return Promise.reject(apiError);
        }

        if (status === 400 && data.fieldErrors) {
            const apiError = new ApiError(400, data.message || "Validation failed", data.fieldErrors);
            return Promise.reject(apiError);
        }

        const apiError = new ApiError(
            status || 500,
            data.message || error.message || "An unexpected error occurred",
            data.fieldErrors || null
        );
        return Promise.reject(apiError);
    }
);

export { apiClient, API_BASE_URL, TOKEN_KEY, isTokenExpired };
