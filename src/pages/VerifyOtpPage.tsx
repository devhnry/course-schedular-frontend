import {useEffect, useState} from "react";
import AuthLayout from "../components/layout/AuthLayout.tsx";
import VerifyOtpForm from "../components/auth/VerifyOtpForm.tsx";
import {useLogin} from "../hooks/useLogin.ts";
import {useAuthStore} from "../store/useAuthStore.ts";
import toast from "react-hot-toast";

const RESEND_WAIT_TIME = 30; // seconds

const VerifyOtpPage = () => {

    const [counter, setCounter] = useState(RESEND_WAIT_TIME);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const { resendOtpForLogin } = useLogin();
    const { authEmail } = useAuthStore()


    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsResendDisabled(false);
        }
    }, [counter]);

    const handleResendOtp = async () => {
        if (isResendDisabled) return;

        console.log("Resending OTP...", authEmail);
        const result = await resendOtpForLogin(authEmail as string);
        if (result.status === "success") {
            toast.success("Otp sent successfully.");
        }
        // Reset timer
        setIsResendDisabled(true);
        setCounter(RESEND_WAIT_TIME);
    };


    return (
        <AuthLayout>
            <div className={`min-h-[calc(100vh-200px)] flex items-center justify-center px-4`}>
                <div className={`bg-white shadow-2xl grid max-h-full max-w-[450px] w-full mx-auto px-10 pt-10 pb-5 mt-14 mb-6 rounded-2xl border-[1px] border-black/10`}>
                    <h1 className={`font-bold text-center font-body text-[24px]`}>Verify OTP</h1>
                    <p className={`text-center font-body text-[14px]`}>Verify OTP to access the system</p>
                    <div className={`mt-8 mb-0`}>
                        <VerifyOtpForm />
                    </div>
                    <div className={`text-center ${isResendDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} mt-4 text-sm`}>
                        {isResendDisabled ? (
                            <span className="text-gray-500">Resend OTP in {counter}s</span>
                        ) : (
                            <button className="text-black/90 cursor-pointer font-medium hover:underline" onClick={handleResendOtp}>
                                Resend OTP
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <p className={`text-center text-[11.5px] font-light text-black/50 relative -bottom-[50px]`}>&copy; 2025 Covenant University. All rights reserved</p>
        </AuthLayout>
    );
};

export default VerifyOtpPage;
