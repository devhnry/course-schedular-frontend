import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type OtpType = "login" | "forgot_password" | "password_confirmation"

interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;

    authEmail: string | null;
    setAuthEmail: (email: string | null) => void;

    fullName: string | null
    setFullName: (fullName: string) => void

    otpType: OtpType | null;
    setOtpType: (otpType: OtpType | null) => void;

    role: string | null;
    setRole: (role: string | null) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set({ token }),

            authEmail: null,
            setAuthEmail: (authEmail) => set({ authEmail }),

            otpType: null,
            setOtpType: (otpType) => set({ otpType }),

            role: null,
            setRole: (role) => set({ role }),

            fullName: null,
            setFullName: (fullName: string) => set({ fullName }),

            logout: () =>
            set({
                token: null,
                authEmail: null,
                otpType: null,
                role: null,
            }),
        }),
        {
            name: 'auth-storage', // key in localStorage
        }
    )
);

export const getAuthStore = useAuthStore;
