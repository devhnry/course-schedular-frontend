import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔒 Endpoints that don't require auth
const AUTH_EXCLUDE_ENDPOINTS = ["/auth/login", "/auth/login/verify-otp", "/auth/reset-password"];


const getStoredToken = (): string | null => {
    try {
        const raw = localStorage.getItem("auth-storage");
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        console.log(parsed.state.token)
        return parsed?.state?.token ?? null;
    } catch (err) {
        console.error("Failed to parse token from localStorage:", err);
        return null;
    }
};

apiClient.interceptors.request.use((config) => {
    const token = getStoredToken()
    // Ignore token for endpoints in AUTH_EXCLUDE_ENDPOINTS
    const shouldExclude = AUTH_EXCLUDE_ENDPOINTS.some((endpoint) =>
        config.url?.includes(endpoint)
    );
    console.log(token)

    if (token && !shouldExclude) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("🔒 Token expired or unauthorized. Logging out...");
            localStorage.removeItem("auth-storage");
            toast.error("Session expired. Please log in again.");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);


// Global error handling
apiClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
);

export default apiClient;
