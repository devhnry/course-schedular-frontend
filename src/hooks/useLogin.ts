import {useState} from "react";
import {login as loginRequest, logoutApi, resendOtpApi, verifyLoginOtp} from "../api/auth";
import {useAuthStore} from "../store/useAuthStore";
import {LoginInput, OtpInput, otpSchema} from "../schemas/authSchema";
import {AuthStatusCode, LoginResponse, LogoutResponse} from "../types/auth.ts";
import toast from "react-hot-toast";
import {AxiosError} from "axios";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setAuthEmail, setOtpType, setToken, setRole, setFullName } = useAuthStore();

    const login = async (data: LoginInput): Promise<"otp" | null> => {
        try {
            setLoading(true);
            const response = await loginRequest(data);
            const res: LoginResponse = response.data;

            switch (res.statusCode) {
                case AuthStatusCode.RequireOTP: // OTP required
                    setAuthEmail(res.data.email);
                    setOtpType('login')
                    toast("OTP sent to your email", { icon: "📨" });
                    return "otp";
                case AuthStatusCode.UserNotFound:
                case AuthStatusCode.InvalidPassword:
                    setError(res.statusMessage);
                    console.error(res.statusMessage);
                    toast.error(res.statusMessage || "Login failed");
                    return null;
                default:
                    setError("Unexpected response from server");
                    return null;
            }
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Failed to update access");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const resendOtpForLogin = async (email: string): Promise<{ status: "success" | "failed" | null }> => {
        try {
            setOtpLoading(true); // optional: show spinner on button

            const response = await resendOtpApi({ email }); // assumes axios helper
            const res: LoginResponse = response.data;

            switch (res.statusCode) {
                case AuthStatusCode.RequireOTP:
                    toast.success("OTP has been resent successfully");
                    console.log(res)
                    console.log(res.statusMessage);
                    return { status: "success" };
                case AuthStatusCode.UserNotFound:
                    console.log(res);
                    toast.error(res.statusMessage || "Too many attempts. Try again later");
                    return { status: "failed" };
                default:
                    toast.error(res.statusMessage || "Failed to resend OTP");
                    return { status: "failed" };
            }
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Failed to send OTP");
            return { status: null };
        } finally {
            setOtpLoading(false);
        }
    };

    const verifyOtp = async (data: OtpInput): Promise<
        { status: "success" | "failed" | null, role?: string }> => {
        const parsed = otpSchema.safeParse(data);
        if (!parsed.success) {
            const firstIssue = parsed.error.issues[0];
            toast.error(firstIssue.message, {
                duration: 3000
            });
            return {status: null};
        }
        
        try{
            setOtpLoading(true);
            const response = await verifyLoginOtp(data);
            console.log(response);
            const res: LoginResponse = response.data;

            switch (res.statusCode) {
                case AuthStatusCode.Success:
                    { const { email, accessToken, role, fullName } = res.data;
                        console.log(fullName, res.data)
                    setAuthEmail(email);
                    setToken(accessToken);
                    setRole(role);
                    setFullName(fullName);
                    toast.success("Login successfully");
                    return { status :"success", role } }
                case AuthStatusCode.ExpiredOrInvalidOtp:
                    setError(res.statusMessage);
                    toast.error(res.statusMessage || "Login failed");
                    return {status: "failed"};
                default:
                    setError("Unexpected response from server");
                    return { status: null };
            }
            
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Login FAILED");
            return { status: null };
        } finally {
            setOtpLoading(false);
        }
    }

    const logout = async (): Promise<"success" | "failed" | null> => {
        try {
            setLoading(true);
            const response = await logoutApi();
            console.log(response);
            const res: LogoutResponse = response.data;

            switch (res.statusCode) {
                case AuthStatusCode.LogoutSuccess:
                    toast.success("Logged out successfully");
                    return "success";
                case AuthStatusCode.UserNotFound:
                    setError(res.statusMessage);
                    console.error(res.statusMessage);
                    toast.error(res.statusMessage || "Logout failed");
                    return "failed";
                default:
                    setError("Unexpected response from server");
                    return null;
            }
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Logout FAILED");
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { login, resendOtpForLogin, verifyOtp, logout, loading, otpLoading, error };
}
