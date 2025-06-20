import {useState} from "react"
import {useDepartments} from "../../../hooks/useDepartments.ts"
import toast from "react-hot-toast"
import Button from "../../shared/Button.tsx"
import DataTable from "../common/DataTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import CreateDepartmentModal from "./modals/CreateDepartmentModal.tsx"
import EditDepartmentModal from "./modals/EditDepartmentModal.tsx"
import {Edit, Landmark, Trash2} from "lucide-react"
import type {DepartmentResponseDto} from "../../../types/department.ts"

const DepartmentView = () => {
  const { departments, loading, error, remove } = useDepartments()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentResponseDto | null>(null)

  const handleEdit = (dept: DepartmentResponseDto) => {
    setSelectedDepartment(dept)
    setShowEditModal(true)
  }

  const handleDelete = async (dept: DepartmentResponseDto) => {
    if (window.confirm(`Are you sure you want to delete ${dept.name}?`)) {
      await remove(dept.id)
      toast.success("Department deleted successfully")
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
      key: "name",
      label: "Name",
      render: (dept: DepartmentResponseDto) => <div className="font-medium text-gray-900">{dept.name}</div>,
    },
    {
      key: "code",
      label: "Code",
      render: (dept: DepartmentResponseDto) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {dept.code}
        </span>
      ),
    },
    {
      key: "collegeBuildingName",
      label: "College Building",
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
            <p className="text-red-600 font-medium">Error loading departments</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
    )
  }

  return (
      <div className="p-6 space-y-6">
        <PageHeader
            title="Manage Departments"
            description="View and manage all university departments"
            icon={Landmark}
            actions={
              <Button
                  text="Add New Department"
                  classname="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md"
                  onClick={() => setShowCreateModal(true)}
              />
            }
        />

        <DataTable
            data={departments}
            columns={columns}
            actions={actions}
            loading={loading}
            emptyMessage="No departments found. Create your first department to get started."
            keyExtractor={(dept) => dept.id}
        />

        <CreateDepartmentModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              // Data will be refreshed automatically by the hook
            }}
        />

        <EditDepartmentModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false)
              setSelectedDepartment(null)
            }}
            department={selectedDepartment}
            onSuccess={() => {
              // Data will be refreshed automatically by the hook
            }}
        />
      </div>
  )
}

export default DepartmentView
