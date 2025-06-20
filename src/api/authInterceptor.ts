import type {AxiosError, AxiosInstance, AxiosResponse} from "axios"
import {clearAuth, getStoredToken, saveToken} from "./tokenUtils.ts"
import {addToQueue, getRefreshing, processQueue, setRefreshing} from "./queue.ts"
import toast from "react-hot-toast"

const AUTH_EXCLUDE_ENDPOINTS = [
    "/login",
    "/refresh-token",
    "/auth/onboard",
    "/auth/login/verify-otp",
    "/auth/resend-otp",
] // etc

export const attachAuthInterceptor = (api: AxiosInstance) => {
    api.interceptors.request.use((config) => {
        const token = getStoredToken()
        if (token && !AUTH_EXCLUDE_ENDPOINTS.some((ep) => config.url?.includes(ep))) {
            config.headers = config.headers ?? {}
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    })

    api.interceptors.response.use(
        (res: AxiosResponse) => res,
        async (error: AxiosError) => {
            const original = error.config as any

            // Check if this is a 401 error and not from excluded endpoints
            if (
                error.response?.status === 401 &&
                original &&
                !AUTH_EXCLUDE_ENDPOINTS.some((ep) => original?.url?.includes(ep))
            ) {
                // Prevent infinite loops
                if (original._retry) {
                    clearAuth()
                    toast.error("Session expired. Please login again.")
                    window.location.href = "/login"
                    return Promise.reject(error)
                }

                // If already refreshing, queue this request
                if (getRefreshing()) {
                    return new Promise((resolve, reject) => {
                        addToQueue(
                            (token: string) => {
                                original.headers["Authorization"] = `Bearer ${token}`
                                resolve(api(original))
                            },
                            (err: Error) => reject(err),
                        )
                    })
                }

                original._retry = true
                setRefreshing(true)

                try {
                    // Attempt to refresh the token
                    const { data } = await api.post("/auth/refresh-token")

                    // Handle new response format: DefaultApiResponse<String>
                    // where data.data is the access token string
                    const newToken = data.data

                    if (!newToken || typeof newToken !== "string") {
                        throw new Error("Invalid access token received from refresh")
                    }

                    saveToken(newToken)
                    processQueue(null, newToken)

                    // Retry the original request with new token
                    original.headers["Authorization"] = `Bearer ${newToken}`
                    return api(original)
                } catch (refreshError) {
                    console.error("Token refresh failed:", refreshError)
                    processQueue(refreshError as Error, null)
                    clearAuth()
                    toast.error("Session expired. Please login again.")
                    window.location.href = "/login"
                    return Promise.reject(refreshError)
                } finally {
                    setRefreshing(false)
                }
            }

            return Promise.reject(error)
        },
    )
}
