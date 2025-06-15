import {create} from "zustand";

type OtpType = "login" | "forgot_password" | "password_confirmation"

type AuthState = {
    token: string | null;
    authEmail: string | null;
    otpType: OtpType | null;
    setOtpType: (otpType: OtpType) => void;
    setToken: (token: string) => void;
    setAuthEmail: (authEmail: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    authEmail: null,
    otpType: null,
    setToken: (token) => set({ token }),
    setAuthEmail: ( authEmail) => set({ authEmail }),
    setOtpType: ( otpType) => set({ otpType }),
    logout: () => set({ token: null }),
}));
