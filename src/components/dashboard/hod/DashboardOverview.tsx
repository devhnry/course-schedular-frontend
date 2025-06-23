import {useHodDashboard} from "../../../store/useHodDashboard.ts"
import StatsCard from "../common/StatsCard.tsx"
import QuickActionCard from "../common/QuickActionCard.tsx"
import {Book, Calendar, Plus, Users} from "lucide-react"
import CreateCourseAssignmentModal from "./modals/CreateCourseAssignmentModal.tsx";
import CreateLecturerModal from "./modals/CreateLecturerModal.tsx";
import CreateCourseModal from "./modals/CreateCourseModal.tsx";
import {useState} from "react";
import {useCourses} from "../../../hooks/useCourse.ts";
import {useLecturer} from "../../../hooks/useLecturer.ts";

const DashboardOverview = () => {
  // @ts-ignore
  const { setSelectedIndex } = useHodDashboard()

  const { courses } = useCourses()
  const { lecturers } = useLecturer()

  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [showCreateLecturer, setShowCreateLecturer] = useState(false)
  const [showCreateAssignment, setShowCreateAssignment] = useState(false)

  const stats = [
    {
      title: "Total Courses",
      value: courses?.length || 0,
      icon: Book,
      color: "blue" as const,
      subtitle: "Department courses",
    },
    {
      title: "Total Lecturers",
      value: lecturers?.length || 0,
      icon: Users,
      color: "green" as const,
      subtitle: "Active lecturers",
    },
  ]

  const quickActions = [
    {
      title: "Add Course",
      description: "Create a new course for your department",
      icon: Book,
      color: "blue" as const,
      // onClick: () => setSelectedIndex(1),
      onClick: () => setShowCreateCourse(true),
    },
    {
      title: "Add Lecturer",
      description: "Register a new lecturer",
      icon: Users,
      color: "green" as const,
      onClick: () => setShowCreateLecturer(true)
    },
    {
      title: "Course Assignment",
      description: "Assign lecturers to courses",
      icon: Plus,
      color: "purple" as const,
      onClick: () => setShowCreateAssignment(true)
    },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">HOD Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your department's courses, lecturers, and assignments.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>
      </div>

      {/* Recent Activities Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-500">Activity tracking will be available in a future update.</p>
        </div>
      </div>

      {/* Modals */}
      <CreateCourseModal
          isOpen={showCreateCourse}
          onClose={() => setShowCreateCourse(false)}
          onSuccess={() => {
            // Refresh courses data if needed
          }}
      />

      <CreateLecturerModal
          isOpen={showCreateLecturer}
          onClose={() => setShowCreateLecturer(false)}
          onSuccess={() => {
            // Refresh lecturers data if needed
          }}
      />

      <CreateCourseAssignmentModal
          isOpen={showCreateAssignment}
          onClose={() => setShowCreateAssignment(false)}
          onSuccess={() => {
            // Refresh assignments data if needed
          }}
      />
    </div>
  )
}

export default DashboardOverview
