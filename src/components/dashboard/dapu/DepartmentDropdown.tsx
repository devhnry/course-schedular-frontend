import {useEffect, useRef, useState} from "react";
import {ChevronDown} from "lucide-react";

interface Department {
    id: number;
    name: string;
}

interface Props {
    departments: Department[];
    onSelect: (dept: Department) => void;
    selected: Department | null;
}

const DepartmentDropdown = ({ departments, selected, onSelect }: Props) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full border border-gray-300 px-4 py-3 rounded-md bg-white text-sm text-left cursor-pointer"
            >
                <span className={`${selected ? 'opacity-100' : 'opacity-60'}`}>{selected ? selected.name : "Select Department"}</span>
                <ChevronDown className="h-4 w-4 text-gray-500 opacity-100 cursor-pointer" />
            </button>

            {open && (
                <ul
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto"
                >
                    {departments.map((dept) => (
                        <li
                            key={dept.id}
                            onClick={() => {
                                onSelect(dept);
                                setOpen(false);
                            }}
                            className={`px-4 py-2 cursor-pointer hover:bg-black hover:text-white text-sm ${
                                selected?.id === dept.id ? "bg-gray-100" : ""
                            }`}
                        >
                            {dept.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DepartmentDropdown;
