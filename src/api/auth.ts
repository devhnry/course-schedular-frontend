// src/api/auth.ts
import apiClient from "../services/apiClient";
import {LoginInput} from "../schemas/authSchema";

export const login = (data: LoginInput) =>
    apiClient.post("/auth/login", data);

export const logout = () => apiClient.post("/auth/logout");
