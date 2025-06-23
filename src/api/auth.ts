import apiClient from "./clients/apiClient.ts";
import {LoginInput, OtpInput} from "../schemas/authSchema";

export const login = (data: LoginInput) =>
    apiClient.post("/auth/login", data);

export const verifyLoginOtp= (data: OtpInput) =>
    apiClient.post("/auth/login/verify-otp", data);

export const resendOtpApi = (params: {email: string}) =>
    apiClient.post(`/auth/resend-otp?email=${params.email}`);

export const logoutApi =
    () => apiClient.post("/logout");
