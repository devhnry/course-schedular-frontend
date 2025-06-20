"use client"

import {useEffect, useState} from "react"
import toast from "react-hot-toast"
import Button from "../../shared/Button"
import {useCourses} from "../../../hooks/useCourse"
import DataTable from "../common/DataTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import CreateCourseModal from "./modals/CreateCourseModal.tsx"
import EditCourseModal from "./modals/EditCourseModal.tsx"
import {AlertCircle, Book, Edit, Trash2} from "lucide-react"
import type {CourseResponseDto} from "../../../types/course.ts"

const CoursesView = () => {
  const { courses, loading, error, remove } = useCourses()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<CourseResponseDto | null>(null)

  const handleEdit = (course: CourseResponseDto) => {
    setSelectedCourse(course)
    setShowEditModal(true)
  }

  const handleDelete = async (course: CourseResponseDto) => {
    if (window.confirm(`Are you sure you want to delete ${course.courseCode}?`)) {
      await remove(course.id)
      toast.success("Course deleted successfully")
    }
  }

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const columns = [
    {
      key: "index",
      label: "#",
      render: (_: any, index: number) => index + 1,
      className: "w-16",
    },
    {
      key: "courseCode",
      label: "Code",
      render: (course: CourseResponseDto) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {course.courseCode}
        </span>
      ),
    },
    {
      key: "courseName",
      label: "Name",
      render: (course: CourseResponseDto) => <div className="font-medium text-gray-900">{course.courseName}</div>,
    },
    {
      key: "level",
      label: "Level",
    },
    {
      key: "credits",
      label: "Credits",
    },
    {
      key: "programName",
      label: "Program",
    },
    {
      key: "expectedStudents",
      label: "Expected",
      render: (course: CourseResponseDto) => course.expectedStudents || "—",
    },
    {
      key: "tags",
      label: "Tags",
      render: (course: CourseResponseDto) => (
        <div className="flex gap-1">
          {course.isGeneralCourse && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              GEN
            </span>
          )}
          {course.isSportsCourse && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              SPORT
            </span>
          )}
        </div>
      ),
    },
  ]

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
      icon: <Edit size={16} />,
      className: "text-gray-700 hover:text-gray-900",
    },
    {
      label: "Delete",
      onClick: handleDelete,
      icon: <Trash2 size={16} />,
      className: "text-red-600 hover:text-red-800",
    },
  ]

  if (error) {
    return (
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 font-medium">Unable to Fetch Courses: Session Timeout</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Manage Courses"
        description="View and manage courses in your department"
        icon={Book}
        actions={
          <Button
            text="Add New Course"
            classname="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md"
            onClick={() => setShowCreateModal(true)}
          />
        }
      />

      {/* Course Assignment Issue Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Course Status</h3>
            <p className="text-sm text-yellow-700 mt-1">
              The courses displayed will be courses directly under your department.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        data={courses}
        columns={columns}
        actions={actions}
        loading={loading}
        emptyMessage="No courses found. Create your first course to get started."
        keyExtractor={(course) => course.id}
      />

      <CreateCourseModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            // Data will be refreshed automatically by the hook
          }}
      />

      <EditCourseModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedCourse(null)
          }}
          course={selectedCourse}
          onSuccess={() => {
            // Data will be refreshed automatically by the hook
          }}
      />

    </div>
  )
}

export default CoursesView
