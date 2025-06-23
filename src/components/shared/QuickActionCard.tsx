"use client"

import type {LucideIcon} from "lucide-react"

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  onClick: () => void
  color: "blue" | "green" | "purple" | "orange"
}

const QuickActionCard = ({ title, description, icon: Icon, onClick, color }: QuickActionCardProps) => {
  const colorClasses = {
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
  }

  return (
    <div
      onClick={onClick}
      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
    >
      <Icon className={`h-8 w-8 ${colorClasses[color]} mb-2 group-hover:scale-110 transition-transform`} />
      <h4 className="font-medium text-gray-900 group-hover:text-black">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

export default QuickActionCard
