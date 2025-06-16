// src/api/auth.ts
import apiClient from "../services/apiClient";
import {LoginInput, OtpInput} from "../schemas/authSchema";

export const login = (data: LoginInput) =>
    apiClient.post("/auth/login", data);

export const verifyLoginOtp= (data: OtpInput) =>
    apiClient.post("/auth/login/verify-otp", data);

export const logoutApi =
    () => apiClient.post("/logout");
