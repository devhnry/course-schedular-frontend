import axios from "axios";
import {attachAuthInterceptor} from '../authInterceptor';

const apiClient = axios.create({
    baseURL: "http://localhost:6050/api/v1",
    withCredentials: true,
});

attachAuthInterceptor(apiClient);

export default apiClient;
