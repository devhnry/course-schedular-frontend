import {useState} from "react";
import {login as loginRequest, logoutApi, verifyLoginOtp} from "../api/auth";
import {useAuthStore} from "../store/useAuthStore";
import {LoginInput, loginSchema, OtpInput, otpSchema} from "../schemas/authSchema";
import {AuthStatusCode, LoginResponse, LogoutResponse} from "../types/api/auth";
import toast from "react-hot-toast";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setAuthEmail, setOtpType, setToken, setRole } = useAuthStore();

    const login = async (data: LoginInput): Promise<"otp" | null> => {
        const parsed = loginSchema.safeParse(data);
        if (!parsed.success) {
            const firstIssue = parsed.error.issues[0];
            toast.error(firstIssue.message, {
                duration: 3000
            });
            return null;
        }

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
        } catch (err: any) {
            setError(err.response?.data?.statusMessage || "Login failed");
            return null;
        } finally {
            setLoading(false);
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
                    { const { email, accessToken, role } = res.data;
                    setAuthEmail(email);
                    setToken(accessToken);
                    setRole(role)
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
            
        } catch (err: any) {
            setError(err.response?.data?.statusMessage || "Login failed");
            setOtpLoading(false);
            return {status: null};
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
        } catch (err: any) {
            setError(err.response?.data?.statusMessage || "Logout failed");
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { login, verifyOtp, logout, loading, otpLoading, error };
}
