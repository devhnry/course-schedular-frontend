import Button from "../shared/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useLogin} from "../../hooks/useLogin.ts";
import {useForm} from "react-hook-form";
import {LoginInput} from "../../schemas/authSchema.ts";
import {useState} from "react";
import {EyeClosedIcon, EyeIcon} from "lucide-react";


const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { login, loading } = useLogin()
    const { register,  handleSubmit } = useForm<LoginInput>();

    const onSubmit = async (data: LoginInput) => {
        const result = await login(data);
        if (result === "otp") {
            navigate("/verify-otp");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`grid w-full gap-4`}>
            <div>
                <label className={`text-[14px] pb-1 block`}>Email Address</label>
                <input
                    {...register("email", { required: true })}
                    className={`w-full border p-3 border-black/20 outline-none rounded-md text-[14px] placeholder:text-gray-500/80`}
                    type="text" name="email" id="email" placeholder="hod@covenantuniveristy.edu.ng"/>
            </div>
            <div className={`relative`}>
                <div onClick={() => {setShowPassword(!showPassword)}}
                     className={`absolute right-[10px] top-[55%] cursor-pointer z-10`}>
                    {showPassword ? <EyeIcon className={`size-[20px]`} /> : <EyeClosedIcon className={`size-[20px]`} />}
                </div>
                <button
                    className={`text-[11.5px] pb-1 block cursor-pointer absolute right-[2px] top-[6.5px] font-light hover:underline transition-all `}
                    onClick={() => navigate('/forgot-password')}>Forgot Password ?</button>
                <label className={`text-[14px] pb-1 block`}>Password</label>
                <input
                    {...register("password", { required: true })}
                    className={`w-full border p-3 border-black/20 outline-none rounded-md text-[14px] placeholder:text-gray-500/80`}
                    type={`${showPassword ? 'text' : 'password'}`} name="password" id="password" placeholder="passsword"/>
            </div>
            <Button text={loading ? 'Logging in..' : 'Sign in'}
                    classname={`w-full bg-black text-white p-2.5 font-body text-[14px] mb-3 ${loading ? 'opacity-50' : ''}`} />
            <div className={`grid gap-4 w-full`}>
                <hr className={`opacity-10`} />
                <p className={`text-center text-[11.5px] font-light`}>Don't have an account? <strong className={`font-medium`}>Contact DAPU</strong></p>
                <hr className={`opacity-10`} />
            </div>
        </form>
    );
};

export default LoginForm;