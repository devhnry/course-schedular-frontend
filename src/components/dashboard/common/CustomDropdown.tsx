import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = {
    value: string;
    label: string;
};

type CustomDropdownProps = {
    label: string;
    name: string;
    value: string;
    options: Option[];
    onChange: (e: { target: { name: string; value: string } }) => void;
    error?: string;
};

export default function CustomDropdown({ label, name, value, options, onChange, error }: CustomDropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel =
        options.find((option) => option.value === value)?.label || "Select College Building";

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-sm mb-1 block">{label}</label>
            <button
                type="button"
                className="w-full border p-3 border-black/20 rounded-md text-sm text-left flex justify-between items-center"
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>{selectedLabel}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`p-2 px-3 cursor-pointer text-sm hover:bg-gray-100 flex justify-between items-center ${
                                option.value === value ? "bg-gray-100 font-medium" : ""
                            }`}
                            onClick={() => {
                                onChange({ target: { name, value: option.value } });
                                setOpen(false);
                            }}
                        >
                            {option.label}
                            {option.value === value && <Check className="w-4 h-4 text-green-500" />}
                        </li>
                    ))}
                </ul>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
