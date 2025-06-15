import {create} from "zustand";

type AuthState = {
    token: string | null;
    authEmail: string | null;
    setToken: (token: string) => void;
    setAuthEmail: (authEmail: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    authEmail: null,
    setToken: (token) => set({ token }),
    setAuthEmail: ( authEmail) => set({ authEmail }),
    logout: () => set({ token: null }),
}));
