import Button from "../components/shared/Button";
import TextInput from "../components/shared/TextInput";
import {useForm} from "react-hook-form";
import {OnboardRequestDto} from "../types/auth";
import {useOnboard} from "../hooks/useOnboard";
import {useAuthStore} from "../store/useAuthStore";
import toast from "react-hot-toast";
import AuthLayout from "../components/layout/AuthLayout.tsx";

const OnboardPage = () => {
    const { invitedEmail, invitedDepartment } = useAuthStore();
    const { register, handleSubmit } = useForm<Omit<OnboardRequestDto, "emailAddress">>();
    const { onboard } = useOnboard();

    const handleOnboard = async (data: Omit<OnboardRequestDto, "emailAddress">) => {
        if (!invitedEmail) {
            toast.error("Missing email. Please return to invite link.");
            return;
        }

        await onboard({
            emailAddress: invitedEmail,
            ...data,
            departmentCode: invitedDepartment as string,
        });
    };

    return (
        <AuthLayout>
            <div className="my-20 flex items-center justify-center px-4">
                <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg border-[0.5px] border-black/20">
                    <h1 className="text-2xl font-bold mb-4 text-center">Set Your Password</h1>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        You're almost there. Just choose a secure password to complete your HOD onboarding.
                    </p>

                    <form onSubmit={handleSubmit(handleOnboard)} className="grid gap-4 w-full">
                        <TextInput
                            label="Full Name"
                            name="fullName"
                            placeholder="Prof. John Doe"
                            register={register}
                        />

                        <div>
                            <label className="text-sm pb-1 block">Email Address</label>
                            <input
                                readOnly
                                value={invitedEmail as string}
                                className="w-full border p-3 border-black/20 outline-none rounded-md text-sm bg-gray-100 text-gray-500"
                            />
                        </div>

                        <TextInput
                            label="Password"
                            name="password"
                            placeholder="••••••••"
                            register={register}
                            showToggle
                        />

                        <TextInput
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            register={register}
                            showToggle
                        />

                        <div>
                            <label className="text-sm pb-1 block">Department</label>
                            <input
                                readOnly
                                value={invitedDepartment as string}
                                className="w-full border p-3 border-black/20 outline-none rounded-md text-sm bg-gray-100 text-gray-500"
                            />
                        </div>
                        <Button
                            type="submit"
                            text="Complete Setup"
                            classname="w-full bg-black text-white py-2.5 text-sm mt-2"
                        />
                    </form>

                    <hr className="opacity-10 mt-6" />
                    <p className="text-center text-xs font-light mt-4">
                        Having issues? <strong className="font-medium">Contact DAPU</strong>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default OnboardPage;
