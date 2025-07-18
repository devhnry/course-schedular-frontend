import { onboardHod } from "../api/clients/authClient.ts"
import type { OnboardRequestDto } from "../types/auth.ts"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore.ts" // your token/role setter

export const useOnboard = () => {
    const navigate = useNavigate()
    const { setToken, setRole, setAuthEmail, setFullName } = useAuthStore()

    const onboard = async (payload: OnboardRequestDto): Promise<boolean> => {
        try {
            const response = await onboardHod(payload)
            const res = response
            console.log(res)

            if (res.statusCode === 11) {
                const { accessToken, role, emailAddress, fullName } = res.data
                setToken(accessToken)
                setRole(role)
                setAuthEmail(emailAddress)
                setFullName(fullName)

                // Set login time for session management
                localStorage.setItem("loginTime", Date.now().toString())

                toast.success("Account setup successful!")
                navigate("/dashboard/hod") // or wherever your HOD dashboard is
                return true
            } else {
                toast.error(res.statusMessage || "Unexpected server response.")
                return false
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.statusMessage || "Failed to onboard.")
            return false
        }
    }

    return { onboard }
}
