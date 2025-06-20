import * as React from "react";
import {useRef, useState} from "react";
import Button from "../shared/Button.tsx";
import {useForm} from "react-hook-form";
import {OtpInput} from "../../schemas/authSchema.ts";
import {useLogin} from "../../hooks/useLogin.ts";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/useAuthStore.ts";

const VerifyOtpForm = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const { otpType } = useAuthStore();

    const navigate = useNavigate();

    const { handleSubmit } = useForm<OtpInput>()
    const {authEmail} = useAuthStore()
    const  {verifyOtp, otpLoading } = useLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("Text").trim();
        if (!/^\d{6}$/.test(pastedData)) return;

        const newOtp = pastedData.split("");
        setOtp(newOtp);
        newOtp.forEach((digit, i) => {
            inputRefs.current[i]!.value = digit;
        });
        inputRefs.current[5]?.focus();
    };

    const finalOtp = otp.join("");

    const onSubmit = async (data: OtpInput) => {
        data.oneTimePassword = finalOtp
        data.email = authEmail as string;
        console.log(data);

        const result = await verifyOtp(data);
        console.log(result.status, otpType, result.role);

        if (result.status === "success" && otpType === 'login') {
            if(result.role === 'DAPU'){
                navigate("/dashboard/dapu");
            }else if(result.role === 'HOD'){
                navigate("/dashboard/hod");
            }else{
                console.log("Something went wrong!");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
            <div className="flex gap-2">
                {otp.map((digit, i) => (
                    <input
                        key={i}
                        //@ts-expect-error invalid ref
                        ref={(el) => (inputRefs.current[i] = el!)}
                        type="text"
                        maxLength={1}
                        defaultValue={digit}
                        onChange={(e) => handleChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        onPaste={handlePaste}
                        className="w-10 h-12 text-center text-lg border border-black/20 rounded-md outline-none focus:border-black transition-all"
                    />
                ))}
            </div>

            <Button type={'submit'}
                    disabled={finalOtp.length !== 6 || otpLoading}
                    classname="bg-black text-white px-4 py-3 text-[16px] text-sm rounded-md disabled:opacity-40 w-full"
                    text={!otpLoading ? 'Verify OTP' : 'Verifying...'}
                    // onClick={() => { console.log("Submitted OTP:", finalOtp);}}
            />
        </form>
    );
};

export default VerifyOtpForm;
