import axios from "axios";
import {attachAuthInterceptor} from "../authInterceptor.ts";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
    withCredentials: true,
});

attachAuthInterceptor(apiClient);

export default apiClient;