import AuthLayout from "../components/layout/AuthLayout.tsx";
import VerifyOtpForm from "../components/auth/VerifyOtpForm.tsx";

const VerifyOtpPage = () => {
    return (
        <AuthLayout>
            <div className={`min-h-[calc(100vh-200px)] flex items-center justify-center px-4`}>
                <div className={`bg-white shadow-2xl grid max-h-full max-w-[450px] w-full mx-auto px-10 pt-10 pb-5 mt-14 mb-6 rounded-2xl border-[1px] border-black/10`}>
                    <h1 className={`font-bold text-center font-body text-[24px]`}>Verify OTP</h1>
                    <p className={`text-center font-body text-[14px]`}>Verify OTP to access the system</p>
                    <div className={`mt-8 mb-0`}>
                        <VerifyOtpForm />
                    </div>
                </div>
            </div>
            <p className={`text-center text-[11.5px] font-light text-black/50 relative -bottom-[50px]`}>&copy; 2025 Covenant University. All rights reserved</p>
        </AuthLayout>
    );
};

export default VerifyOtpPage;