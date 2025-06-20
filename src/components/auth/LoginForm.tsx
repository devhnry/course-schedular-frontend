import Button from "../shared/Button";
import TextInput from "../shared/TextInput";
import {useNavigate} from "react-router-dom";
import {useLogin} from "../../hooks/useLogin";
import {useForm} from "react-hook-form";
import {LoginInput} from "../../schemas/authSchema";

const LoginForm = () => {
    const navigate = useNavigate();
    const { login, loading } = useLogin();
    const { register, handleSubmit } = useForm<LoginInput>();

    const onSubmit = async (data: LoginInput) => {
        const result = await login(data);
        if (result === "otp") {
            navigate("/verify-otp");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-4">
            <TextInput
                label="Email Address"
                name="email"
                placeholder="hod@covenantuniveristy.edu.ng"
                register={register}
            />
            <div className="relative">
                <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs absolute z-10 right-2 top-1.5 font-light hover:underline cursor-pointer"
                >
                    Forgot Password?
                </button>
                <TextInput
                    label="Password"
                    name="password"
                    placeholder="••••••••••"
                    register={register}
                    showToggle
                />
            </div>

            <Button
                text={loading ? "Logging in..." : "Sign in"}
                classname={`w-full bg-black text-white p-2.5 text-sm mb-3 ${loading ? "opacity-50" : ""}`}
            />

            <div className="grid gap-4 w-full">
                <hr className="opacity-10" />
                <p className="text-center text-xs font-light">
                    Don't have an account? <strong className="font-medium">Contact DAPU</strong>
                </p>
                <hr className="opacity-10" />
            </div>
        </form>
    );
};

export default LoginForm;
