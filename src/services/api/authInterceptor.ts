import {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {clearAuth, getStoredToken, saveToken} from "./tokenUtils.ts";
import {addToQueue, getRefreshing, processQueue, setRefreshing} from "./queue";
import toast from "react-hot-toast";

const AUTH_EXCLUDE_ENDPOINTS = ["/login", "/refresh-token"]; // etc

export const attachAuthInterceptor = (api: AxiosInstance) => {
    api.interceptors.request.use(config => {
        const token = getStoredToken();
        if (token && !AUTH_EXCLUDE_ENDPOINTS.some(ep => config.url?.includes(ep))) {
            config.headers = config.headers ?? {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (res: AxiosResponse) => res,
        async (error: AxiosError) => {
            const original = error.config as any;
            if (
                error.response?.status === 401 &&
                !AUTH_EXCLUDE_ENDPOINTS.some((ep) => original?.url?.includes(ep))
            ) {
                if (original._retry) {
                    clearAuth();
                    toast.error("Session expired");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }

                if (getRefreshing()) {
                    return new Promise((resolve, reject) => addToQueue(resolve, reject));
                }

                original._retry = true;
                setRefreshing(true);

                try {
                    const { data } = await api.post("/auth/refresh-token");
                    const newToken = data.accessToken;
                    saveToken(newToken);
                    processQueue(null, newToken);

                    original.headers["Authorization"] = `Bearer ${newToken}`;
                    return api(original);
                } catch (err) {
                    processQueue(err as Error, null);
                    clearAuth();
                    toast.error("Session expired");
                    window.location.href = "/login";
                    return Promise.reject(err);
                } finally {
                    setRefreshing(false);
                }
            }

            return Promise.reject(error);
        }
    );
};
