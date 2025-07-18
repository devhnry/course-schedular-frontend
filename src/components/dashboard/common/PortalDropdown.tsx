"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

export type Option = {
    value: string;
    label: string;
};

type PortalDropdownProps = {
    name: string;
    label: string;
    value: string;
    options: Option[];
    onChange: (e: { target: { name: string; value: string } }) => void;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
};

export default function PortalDropdown({
                                           name,
                                           label,
                                           value,
                                           options,
                                           onChange,
                                           error,
                                           disabled = false,
                                           placeholder = "Select an option",
                                       }: PortalDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

    const updatePosition = () => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const dropdownHeight = Math.min(240, options.length * 44);
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const shouldOpenUpward = spaceBelow < dropdownHeight + 16 && spaceAbove > dropdownHeight + 16;

        setPosition({
            top: shouldOpenUpward
                ? rect.top + window.scrollY - dropdownHeight - 8
                : rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX,
            width: rect.width,
        });
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                !buttonRef.current?.contains(e.target as Node) &&
                !dropdownRef.current?.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        // const handleResizeScroll = () => {
        //     if (isOpen) updatePosition();
        // };

        const handleScroll = (event: Event) => {
            if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
                return
            }
            if (isOpen) { updatePosition() }
        }

        const handleResize = () => {
            if (isOpen) {
                updatePosition()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("scroll", handleScroll, true);
            window.addEventListener("resize", handleResize);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen]);

    const DropdownContent = () => (
        <div
            ref={dropdownRef}
            className="fixed bg-white border border-gray-300 rounded-md shadow-lg z-[10000] max-h-60 overflow-y-auto"
            style={{
                top: position.top,
                left: position.left,
                width: position.width,
            }}
        >
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                        onChange({ target: { name, value: option.value } });
                        setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-100 ${
                        option.value === value ? "bg-blue-50 text-blue-700" : "text-gray-900"
                    }`}
                >
                    <span>{option.label}</span>
                    {option.value === value && <Check size={16} className="text-green-500" />}
                </button>
            ))}
        </div>
    );

    return (
        <div className="relative">
            <label className="text-sm mb-1 block">{label}</label>
            <button
                type="button"
                ref={buttonRef}
                disabled={disabled}
                onClick={() => {
                    if (!isOpen) updatePosition();
                    setIsOpen((prev) => !prev);
                }}
                className={`w-full border p-3 border-black/20 rounded-md text-sm text-left flex justify-between items-center ${
                    disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
            >
                <span className={value ? "text-black" : "text-gray-500"}>{selectedLabel}</span>
                <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {isOpen && createPortal(<DropdownContent />, document.body)}
        </div>
    );
}