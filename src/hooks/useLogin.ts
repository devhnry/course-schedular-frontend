import {useState} from "react";
import {login as loginRequest, verifyLoginOtp} from "../api/auth";
import {useAuthStore} from "../store/useAuthStore";
import {LoginInput, loginSchema, OtpInput, otpSchema} from "../schemas/authSchema";
import {AuthStatusCode, LoginResponse} from "../types/api/auth";
import toast from "react-hot-toast";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setAuthEmail, setOtpType, setToken } = useAuthStore();

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

    const verifyOtp = async (data: OtpInput): Promise<"success" | "failed" | null> => {
        const parsed = otpSchema.safeParse(data);
        if (!parsed.success) {
            const firstIssue = parsed.error.issues[0];
            toast.error(firstIssue.message, {
                duration: 3000
            });
            return null;
        }
        
        try{
            setOtpLoading(true);
            const response = await verifyLoginOtp(data);
            console.log(response);
            const res: LoginResponse = response.data;

            switch (res.statusCode) {
                case AuthStatusCode.Success:
                    setAuthEmail(res.data.email);
                    localStorage.setItem("authEmail", data.email)
                    localStorage.setItem("auth_token", res.data.accessToken);
                    setToken(res.data.accessToken);
                    toast.success("Login successfully");
                    return "success"
                case AuthStatusCode.ExpiredOrInvalidOtp:
                    setError(res.statusMessage);
                    toast.error(res.statusMessage || "Login failed");
                    return "failed";
                default:
                    setError("Unexpected response from server");
                    return null;
            }
            
        } catch (err: any) {
            setError(err.response?.data?.statusMessage || "Login failed");
            setOtpLoading(false);
            return null;
        } finally {
            setOtpLoading(false);
        }
    }

    return { login, verifyOtp, loading, otpLoading, error };
}
