"use client"

import toast from "react-hot-toast"
import {useLecturer} from "../../../hooks/useLecturer.ts"
import Button from "../../shared/Button.tsx"
import DataTable from "../common/DataTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import {Edit, Trash2, Users} from "lucide-react"
import CreateLecturerModal from "./modals/CreateLecturerModal.tsx"
import EditLecturerModal from "./modals/EditLecturerModal.tsx"
import type {LecturerResponseDto} from "../../../types/lecturer.ts"
import {useState} from "react";

const LecturerView = () => {
  const { lecturers, loading, error, remove } = useLecturer()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedLecturer, setSelectedLecturer] = useState<LecturerResponseDto | null>(null)

  const handleEdit = (lecturer: LecturerResponseDto) => {
    setSelectedLecturer(lecturer)
    setShowEditModal(true)
  }


  const handleDelete = async (lecturer: LecturerResponseDto) => {
    if (window.confirm(`Are you sure you want to delete ${lecturer.fullName}?`)) {
      await remove(lecturer.id)
      toast.success("Lecturer deleted successfully")
    }
  }

  const columns = [
    {
      key: "index",
      label: "#",
      render: (_: any, index: number) => index + 1,
      className: "w-16",
    },
    {
      key: "fullName",
      label: "Name",
      render: (lecturer: LecturerResponseDto) => <div className="font-medium text-gray-900">{lecturer.fullName}</div>,
    },
    {
      key: "department",
      label: "Department",
      render: (lecturer: LecturerResponseDto) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {lecturer.departmentName}
        </span>
      ),
    },
    {
      key: "college",
      label: "College",
      render: (lecturer: LecturerResponseDto) => lecturer.collegeName || "Unavailable",
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
          <p className="text-red-600 font-medium">Unable to Fetch Lecturers: Session Timeout</p>
          <p className="text-red-500 text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Manage Lecturers"
        description="View and manage lecturers in your department"
        icon={Users}
        actions={
          <Button
            text="Add New Lecturer"
            classname="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md"
            onClick={() => setShowCreateModal(true)}
          />
        }
      />

      <DataTable
        data={lecturers}
        columns={columns}
        actions={actions}
        loading={loading}
        emptyMessage="No lecturers found. Add your first lecturer to get started."
        keyExtractor={(lecturer) => lecturer.id}
      />

      <CreateLecturerModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            // Data will be refreshed automatically by the hook
          }}
      />

      <EditLecturerModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedLecturer(null)
          }}
          lecturer={selectedLecturer}
          onSuccess={() => {
            // Data will be refreshed automatically by the hook
          }}
      />
    </div>
  )
}

export default LecturerView
