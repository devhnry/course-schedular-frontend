import {useState} from "react";
import {login as loginRequest} from "../api/auth";
import {useAuthStore} from "../store/useAuthStore";
import {LoginInput, loginSchema} from "../schemas/authSchema";
import {AuthStatusCode, LoginResponse} from "../types/api/auth";
import toast from "react-hot-toast";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setAuthEmail } = useAuthStore();

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
                    toast("OTP sent to your email", { icon: "📨" });
                    return "otp";
                case AuthStatusCode.UserNotFound:
                case AuthStatusCode.InvalidPassword:
                    setError(res.statusMessage);
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

    return { login, loading, error };
}
