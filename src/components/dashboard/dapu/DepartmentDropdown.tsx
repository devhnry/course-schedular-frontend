"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { ChevronDown } from "lucide-react"
import type { DepartmentResponseDto } from "../../../types/department"

interface DepartmentDropdownProps {
    departments: DepartmentResponseDto[]
    selected: DepartmentResponseDto | null
    onSelect: (department: DepartmentResponseDto) => void
    disabled?: boolean
}

const DepartmentDropdown = ({ departments, selected, onSelect, disabled = false }: DepartmentDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
    const buttonRef = useRef<HTMLButtonElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        const handleScroll = (event: Event) => {
            if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
                return
            }
            if (isOpen) { updateDropdownPosition() }
        }

        const handleResize = () => {
            if (isOpen) {
                updateDropdownPosition()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            document.addEventListener("scroll", handleScroll, true)
            window.addEventListener("resize", handleResize)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("scroll", handleScroll, true)
            window.removeEventListener("resize", handleResize)
        }
    }, [isOpen])

    const updateDropdownPosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top
            const dropdownHeight = Math.min(240, departments.length * 56) // More accurate height calculation

            const shouldOpenUpward = spaceBelow < dropdownHeight + 16 && spaceAbove > dropdownHeight + 16

            setDropdownPosition({
                top: shouldOpenUpward
                    ? rect.top + window.scrollY - dropdownHeight - 8 // 8px gap above
                    : rect.bottom + window.scrollY + 8, // 8px gap below
                left: rect.left + window.scrollX,
                width: rect.width,
            })
        }
    }

    const handleToggle = () => {
        if (!disabled) {
            if (!isOpen) {
                updateDropdownPosition()
            }
            setIsOpen(!isOpen)
        }
    }

    const handleSelect = (department: DepartmentResponseDto) => {
        if (!disabled) {
            onSelect(department)
            setIsOpen(false)
        }
    }

    const DropdownContent = () => (
        <div
            ref={dropdownRef}
            className="fixed bg-white border border-gray-300 rounded-lg shadow-xl"
            style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                zIndex: 10000, // Very high z-index
                maxHeight: "240px",
            }}
        >
            {departments.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 text-sm">No departments available</div>
            ) : (
                <div
                    className="overflow-y-auto max-h-60"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#CBD5E0 #F7FAFC",
                    }}
                >
                    {departments.map((department, index) => (
                        <button
                            key={department.id}
                            type="button"
                            onClick={() => handleSelect(department)}
                            className={`w-full cursor-pointer px-4 py-1.5 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-sm transition-colors ${
                                index !== departments.length - 1 ? "border-b border-gray-100" : ""
                            } ${selected?.id === department.id ? "bg-blue-50 text-blue-700" : "text-gray-900"}`}
                        >
                            <div>
                                <div className="font-medium">{department.name}</div>
                                <div className="text-gray-500 text-xs mt-1">{department.code}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                type="button"
                onClick={handleToggle}
                disabled={disabled}
                className={`w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none transition-colors ${
                    disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:border-gray-400"
                }`}
            >
                <div className="flex items-center justify-between">
          <span className={selected ? "text-gray-900" : "text-gray-500"}>
            {selected ? selected.name : "Select a department"}
          </span>
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${
                            disabled ? "text-gray-400" : "text-gray-600"
                        }`}
                    />
                </div>
            </button>

            {isOpen && !disabled && createPortal(<DropdownContent />, document.body)}
        </div>
    )
}

export default DepartmentDropdown
