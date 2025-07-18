import {EyeClosedIcon, EyeIcon} from "lucide-react";
import {FC, useState} from "react";
import {UseFormRegister} from "react-hook-form";

type TextInputProps = {
    label: string;
    type?: string;
    placeholder: string;
    register: UseFormRegister<any>;
    name: string;
    showToggle?: boolean;
    disabled?: boolean;
    required?: boolean;
};

const TextInput: FC<TextInputProps> = ({label, type="text", placeholder, register, name, showToggle, disabled = false,   required = false }) => {
    const [show, setShow] = useState(false);
    const registerProps = register(name, required ? { required: "This field is required" } : {});
    return (
        <div className="relative">
            <label className="text-sm pb-1 block">{label}</label>
            {showToggle && (
                <div
                    className="absolute right-2 top-9 cursor-pointer z-10"
                    onClick={() => setShow(!show)}
                >
                    {show ? <EyeIcon className="size-5" /> : <EyeClosedIcon className="size-5" />}
                </div>
            )}
            <input
                {...registerProps}
                type={showToggle ? (show ? "text" : "password") : type}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full border p-3 border-black/20 outline-none rounded-md text-sm placeholder:text-gray-500/80"
            />
        </div>
    );
};

export default TextInput;
