import {EyeClosedIcon, EyeIcon} from "lucide-react";
import {FC, useState} from "react";

type TextInputProps = {
    label: string;
    type?: string;
    placeholder: string;
    register: any;
    name: string;
    showToggle?: boolean;
};

const TextInput: FC<TextInputProps> = ({label, type="text", placeholder, register, name, showToggle}) => {
    const [show, setShow] = useState(false);
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
                {...register(name)}
                type={showToggle ? (show ? "text" : "password") : type}
                placeholder={placeholder}
                className="w-full border p-3 border-black/20 outline-none rounded-md text-sm placeholder:text-gray-500/80"
            />
        </div>
    );
};

export default TextInput;
