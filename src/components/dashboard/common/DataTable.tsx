"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MoreVertical } from "lucide-react"

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (item: T, index: number) => React.ReactNode
  className?: string
}

interface Action<T> {
  label: string
  onClick: (item: T) => void
  className?: string
  icon?: React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  loading?: boolean
  emptyMessage?: string
  keyExtractor: (item: T) => string | number
}

function DataTable<T>({
                        data,
                        columns,
                        actions,
                        loading,
                        emptyMessage = "No data found.",
                        keyExtractor,
                      }: DataTableProps<T>) {
  const [showDropdownFor, setShowDropdownFor] = useState<string | number | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const toggleDropdown = (id: string | number) => {
    console.log("Toggle dropdown for:", id)
    setShowDropdownFor((prev) => (prev === id ? null : id))
  }

  const handleActionClick = (action: Action<T>, item: T) => {
    console.log("Action clicked:", action.label, "for item:", item)
    action.onClick(item)
    setShowDropdownFor(null)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInsideAnyDropdown = Object.values(dropdownRefs.current).some(
          (ref) => ref && ref.contains(event.target as Node),
      )

      // Also check if click is inside any dropdown menu
      const dropdownMenus = document.querySelectorAll("[data-dropdown-menu]")
      const isClickInsideDropdownMenu = Array.from(dropdownMenus).some((menu) => menu.contains(event.target as Node))

      if (!isClickInsideAnyDropdown && !isClickInsideDropdownMenu) {
        setShowDropdownFor(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Calculate minimum rows to show (actual data + 2 extra rows)
  const minRowsToShow = data.length + 2
  const emptyRowsToAdd = Math.max(0, minRowsToShow - data.length)

  if (loading) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        </div>
    )
  }

  return (
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((column, index) => (
                <th
                    key={index}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ""}`}
                >
                  {column.label}
                </th>
            ))}
            {actions && actions.length > 0 && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
            )}
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => {
            const itemKey = keyExtractor(item)
            return (
                <tr key={itemKey} className="hover:bg-gray-50 transition-colors">
                  {columns.map((column, colIndex) => (
                      <td key={colIndex} className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ""}`}>
                        {column.render ? column.render(item, index) : String((item as any)[column.key] || "—")}
                      </td>
                  ))}
                  {actions && actions.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap text-center relative">
                        <button
                            ref={(el) => {
                              dropdownRefs.current[itemKey.toString()] = el
                            }}
                            onClick={() => toggleDropdown(itemKey)}
                            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {showDropdownFor === itemKey && (
                            <div
                                data-dropdown-menu
                                className="absolute right-4 top-16 w-48 z-30 bg-white border border-gray-200 rounded-md shadow-lg animate-fade-in"
                            >
                              {actions.map((action, actionIndex) => (
                                  <button
                                      key={actionIndex}
                                      onClick={() => handleActionClick(action, item)}
                                      className={`w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${action.className || ""}`}
                                  >
                                    {action.icon}
                                    {action.label}
                                  </button>
                              ))}
                            </div>
                        )}
                      </td>
                  )}
                </tr>
            )
          })}

          {/* Render empty rows to extend table height */}
          {emptyRowsToAdd > 0 &&
              Array.from({ length: emptyRowsToAdd }).map((_, index) => (
                  <tr key={`empty-${index}`} className="hover:bg-gray-50 transition-colors">
                    {columns.map((_, colIndex) => (
                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm">
                          &nbsp;
                        </td>
                    ))}
                    {actions && actions.length > 0 && <td className="px-6 py-4 whitespace-nowrap text-center">&nbsp;</td>}
                  </tr>
              ))}

          {/* Show empty message only when no data at all */}
          {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-500 italic">
                  {emptyMessage}
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  )
}

export default DataTable
