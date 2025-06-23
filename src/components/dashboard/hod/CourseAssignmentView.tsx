"use client"

import toast from "react-hot-toast"
import {useCourseAssignments} from "../../../hooks/useCourseAssignment.ts"
import Button from "../../shared/Button.tsx"
import DataTable from "../common/DataTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import CreateCourseAssignmentModal from "./modals/CreateCourseAssignmentModal.tsx"
import EditCourseAssignmentModal from "./modals/EditCourseAssignmentModal.tsx"
import {AlertCircle, Calendar, Edit, Trash2} from "lucide-react"
import type {CourseAssignmentResponseDto} from "../../../types/courseAssignment.ts"
import { useState} from "react";

const CourseAssignmentView = () => {
  const { assignments, loading, remove, refetch, error } = useCourseAssignments()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<CourseAssignmentResponseDto | null>(null)

  const handleEdit = (assignment: CourseAssignmentResponseDto) => {
      setSelectedAssignment(assignment)
      setShowEditModal(true)
  }
      //
      // useEffect(() => {
      //     getAssignmentsForDepartment(assignment.id)
      // }, []);

  const handleDelete = async (assignment: CourseAssignmentResponseDto) => {
    if (window.confirm(`Are you sure you want to delete the assignment for ${assignment.courseCode}?`)) {
      try {
        await remove(assignment.id)
        toast.success("Assignment deleted successfully")
        await refetch()
      } catch (e: any) {
        toast.error("Could not delete assignment")
      }
    }
  }

  const columns = [
    {
      key: "courseCode",
      label: "Course",
      render: (assignment: CourseAssignmentResponseDto) => (
        <div>
          <div className="font-medium text-gray-900">{assignment.courseCode}</div>
          <div className="text-sm text-gray-500">{assignment.courseTitle}</div>
        </div>
      ),
    },
    {
      key: "programName",
      label: "Program",
      render: (assignment: CourseAssignmentResponseDto) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {assignment.programName}
        </span>
      ),
    },
    {
      key: "lecturerNames",
      label: "Lecturers",
      render: (assignment: CourseAssignmentResponseDto) => (
        <div className="space-y-1">
          {assignment.lecturerNames.map((name, index) => (
            <div key={index} className="text-sm text-gray-700">
              {name}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "buildingCode",
      label: "Building",
      render: (assignment: CourseAssignmentResponseDto) =>
        assignment.buildingCode ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {assignment.buildingCode}
          </span>
        ) : (
          <span className="text-gray-400 text-sm">Not assigned</span>
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
            <p className="text-red-600 font-medium">Unable to Fetch Assignments: Session Timeout</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Course Assignments"
        description="Manage lecturer assignments for department courses"
        icon={Calendar}
        actions={
          <Button
            text="Create Assignment"
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
            <h3 className="text-sm font-medium text-yellow-800">Course Assignment Status</h3>
            <p className="text-sm text-yellow-700 mt-1">
              The course assignment system is currently under development. Some features may not work as expected,
              including general course settings.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        data={assignments}
        columns={columns}
        actions={actions}
        loading={loading}
        emptyMessage="No course assignments found. Create your first assignment to get started."
        keyExtractor={(assignment) => assignment.id}
      />

      <CreateCourseAssignmentModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            // Data will be refreshed automatically by the hook
          }}
      />

      <EditCourseAssignmentModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedAssignment(null)
          }}
          assignment={selectedAssignment}
          onSuccess={() => {
            // Data will be refreshed automatically by the hook
          }}
      />
    </div>
  )
}

export default CourseAssignmentView
