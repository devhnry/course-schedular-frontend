import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔒 Endpoints that don't require auth
const AUTH_EXCLUDE_ENDPOINTS = ["/auth/login", "/auth/login/verify-otp", "/auth/reset-password"];

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    // Ignore token for endpoints in AUTH_EXCLUDE_ENDPOINTS
    const shouldExclude = AUTH_EXCLUDE_ENDPOINTS.some((endpoint) =>
        config.url?.includes(endpoint)
    );

    if (token && !shouldExclude) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global error handling
apiClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
);

export default apiClient;
