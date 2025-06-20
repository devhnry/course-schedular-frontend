"use client"

import type {FC, JSX} from "react"
import {Book, CalendarIcon, LayoutDashboardIcon, UsersIcon} from "lucide-react"
import DashboardLayout from "../components/layout/DashboardLayout"
import Container from "../components/shared/Container"

// Page Components
import DashboardHodOverview from "../components/dashboard/hod/DashboardOverview.tsx"
import {useHodDashboard} from "../store/useHodDashboard.ts"
import CoursesView from "../components/dashboard/hod/CoursesView.tsx"
import LecturerView from "../components/dashboard/hod/LecturerView.tsx"
import CourseAssignmentView from "../components/dashboard/hod/CourseAssignmentView.tsx"

interface Page {
  icon: JSX.Element
  title: string
  Component?: FC // React Function Component
}

const HodDashboardPage = () => {
  const pages: Page[] = [
    { icon: <LayoutDashboardIcon size={20} />, title: "Dashboard", Component: DashboardHodOverview },
    { icon: <Book size={20} />, title: "Courses", Component: CoursesView },
    { icon: <UsersIcon size={20} />, title: "Manage Lecturers", Component: LecturerView },
    { icon: <CalendarIcon size={20} />, title: "Course Assignment", Component: CourseAssignmentView },
  ]

  const { selectedIndex, setSelectedIndex } = useHodDashboard()
  const SelectedPage = pages[selectedIndex as number].Component as FC

  return (
    <DashboardLayout>
      <Container className="grid grid-cols-[minmax(200px,250px)_1fr] gap-8 h-[calc(100vh-80px)] overflow-hidden">
        {/* Sidebar */}
        <section className="border-black/10 shadow-md border p-4 my-4 rounded-md sticky top-4 overflow-auto">
          <nav className="flex flex-col gap-2">
            {pages.map((page, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-md transition cursor-pointer ${
                  selectedIndex === i ? "bg-black text-white" : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {page.icon}
                {page.title}
              </button>
            ))}
          </nav>
        </section>

        {/* Main Content */}
        <section className="overflow-y-auto h-full pr-2">
          <SelectedPage />
        </section>
      </Container>
    </DashboardLayout>
  )
}

export default HodDashboardPage
