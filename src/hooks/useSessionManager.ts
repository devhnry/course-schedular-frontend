import { useEffect, useRef, useCallback } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import apiClient from "../api/clients/apiClient"
import showSessionWarning from "../utils/showSessionWarning"
import toast from "react-hot-toast";

const SESSION_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
const WARNING_TIME = 59 * 60 * 1000 // 59 minutes in milliseconds

export const useSessionManager = () => {
    const { token, logout: storeLogout, setToken } = useAuthStore()
    const navigate = useNavigate()
    const warningTimerRef = useRef<NodeJS.Timeout | null>(null)
    const logoutTimerRef = useRef<NodeJS.Timeout | null>(null)
    const loginTimeRef = useRef<number | null>(null)

    // Clear all timers
    const clearTimers = useCallback(() => {
        if (warningTimerRef.current) {
            clearTimeout(warningTimerRef.current)
            warningTimerRef.current = null
        }
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current)
            logoutTimerRef.current = null
        }
    }, [])

    // Logout function
    const logout = useCallback(() => {
        clearTimers()
        localStorage.removeItem("loginTime")
        storeLogout()
        navigate("/login")
    }, [clearTimers, storeLogout, navigate])

    // Refresh token function
    const refreshToken = useCallback(async (): Promise<boolean> => {
        try {
            const response = await apiClient.post(
                "/auth/refresh-token", {}, { withCredentials: true },
            )

            if (response.data?.data) {
                const newToken = response.data.data
                setToken(newToken)

                // Update login time
                const currentTime = Date.now()
                localStorage.setItem("loginTime", currentTime.toString())
                loginTimeRef.current = currentTime

                console.info("Token refreshed successfully")
                return true
            }

            return false
        } catch (error) {
            console.error("Token refresh failed:", error)
            return false
        }
    }, [setToken])

    // Check authentication status
    const checkAuthStatus = useCallback(async (): Promise<boolean> => {
        try {
            const response = await apiClient.get("/auth-check", { withCredentials: true })
            return response.status === 200
        } catch (error) {
            console.error("Auth check failed:", error)
            return false
        }
    }, [])

    // Start session timers
    const startTimers = useCallback(() => {
        clearTimers()

        const currentTime = Date.now()
        const loginTime = loginTimeRef.current || currentTime
        const timeElapsed = currentTime - loginTime

        // Calculate remaining time
        const warningTimeRemaining = WARNING_TIME - timeElapsed
        const logoutTimeRemaining = SESSION_DURATION - timeElapsed

        // If session has already expired
        if (logoutTimeRemaining <= 0) {
            logout()
            return
        }

        // Set warning timer (14 minutes)
        if (warningTimeRemaining > 0) {
            warningTimerRef.current = setTimeout(() => {
                showSessionWarning().then((shouldContinue) => {
                    if (shouldContinue) {
                        refreshToken().then((success) => {
                            if (success) {
                                startTimers()
                            } else {
                                logout()
                            }
                        })
                    }
                    toast.dismiss("session-warning")
                    // else: do nothing, let logout timer handle it
                })
            }, warningTimeRemaining)
        }

        // Set logout timer (15 minutes)
        logoutTimerRef.current = setTimeout(() => {
            logout()
        }, logoutTimeRemaining)
    }, [clearTimers, logout, refreshToken])

    // Initialize session on token change
    useEffect(() => {
        if (!token) {
            clearTimers()
            localStorage.removeItem("loginTime")
            loginTimeRef.current = null
            return
        }

        // Get or set login time
        const storedLoginTime = localStorage.getItem("loginTime")
        if (storedLoginTime) {
            loginTimeRef.current = Number.parseInt(storedLoginTime, 10)
        } else {
            const currentTime = Date.now()
            localStorage.setItem("loginTime", currentTime.toString())
            loginTimeRef.current = currentTime
        }

        startTimers()
    }, [token, startTimers, clearTimers])

    // Check auth status on mount
    useEffect(() => {
        const initializeAuth = async () => {
            if (token) {
                const isValid = await checkAuthStatus()
                if (!isValid) {
                    logout()
                }
            }
        }

        initializeAuth()
    }, []) // Only run on mount

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearTimers()
        }
    }, [clearTimers])

    return {
        refreshToken,
        logout,
        checkAuthStatus,
    }
}
