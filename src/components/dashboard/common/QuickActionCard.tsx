"use client"

import type {LucideIcon} from "lucide-react"

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  onClick: () => void
  color: "blue" | "green" | "purple" | "orange"
  disabled?: boolean
}

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  color,
  disabled = false,
}: QuickActionCardProps) => {
  const colorClasses = {
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
  }

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`p-4 border border-gray-200 rounded-lg transition-all ${
        disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:shadow-md cursor-pointer group bg-white"
      }`}
    >
      <Icon
        className={`h-8 w-8 ${disabled ? "text-gray-400" : colorClasses[color]} mb-2 ${!disabled && "group-hover:scale-110"} transition-transform`}
      />
      <h4 className={`font-medium ${disabled ? "text-gray-400" : "text-gray-900 group-hover:text-black"}`}>{title}</h4>
      <p className={`text-sm ${disabled ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
    </div>
  )
}

export default QuickActionCard
