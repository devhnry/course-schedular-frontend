export const getStoredToken = (): string | null => {
    try {
        const raw = localStorage.getItem("auth-storage");
        const parsed = raw ? JSON.parse(raw) : null;
        return parsed?.state?.token ?? null;
    } catch {
        return null;
    }
};

export const saveToken = (token: string) => {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    parsed.state.token = token;
    localStorage.setItem("auth-storage", JSON.stringify(parsed));
};

export const clearAuth = () => {
    localStorage.removeItem("auth-storage");
};
