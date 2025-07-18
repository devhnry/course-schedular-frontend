import {useState} from "react"
import {useDepartments} from "../../../hooks/useDepartments.ts"
import toast from "react-hot-toast"
import Button from "../../shared/Button.tsx"
import DataTable from "../common/DataTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import CreateDepartmentModal from "./modals/CreateDepartmentModal.tsx"
import EditDepartmentModal from "./modals/EditDepartmentModal.tsx"
import { Landmark, Trash2} from "lucide-react"
import type {DepartmentResponseDto} from "../../../types/department.ts"
import {useDepartmentStore} from "../../../store/useDepartmentStore.ts";
import ConfirmDeleteModal from "../../shared/ConfirmDeleteModal.tsx";

const DepartmentView = () => {
  const { remove, refetch } = useDepartments()
    const { departments, loading, error } = useDepartmentStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentResponseDto | null>(null)

    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [deleteContext, setDeleteContext] = useState<{ label: string; name: string; onConfirm: () => void } | null>(null)

  // const handleEdit = (dept: DepartmentResponseDto) => {
  //   setSelectedDepartment(dept)
  //   setShowEditModal(true)
  // }
    const handleCreateSuccess = () => {
      setShowCreateModal(false)

    }

    const handleDelete = (department: DepartmentResponseDto) => {
        setDeleteContext({
            label: "Department",
            name: department.name,
            onConfirm: async () => {
                try {
                    await remove(department.id)
                    toast.success("Department deleted successfully")
                } catch (error: any) {
                    toast.error(error?.response?.data?.statusMessage || "Failed to delete department")
                } finally {
                    setDeleteContext(null)
                    setShowConfirmDelete(false)
                    refetch().catch(e => console.error(e))
                }
            },
        })
        setShowConfirmDelete(true)
    }

  const columns = [
    // {
    //   key: "index",
    //   label: "#",
    //   render: (_: any, index: number) => index + 1,
    //   className: "w-16",
    // },
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

      // Removed Edit to not break Code

    // {
    //   label: "Edit",
    //   onClick: handleEdit,
    //   icon: <Edit size={16} />,
    //   className: "text-gray-700 hover:text-gray-900",
    // },
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
              handleCreateSuccess()
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

          {showConfirmDelete && deleteContext && (
              <ConfirmDeleteModal
                  isOpen={showConfirmDelete}
                  itemLabel={deleteContext.label}
                  itemName={deleteContext.name}
                  onClose={() => {
                      setShowConfirmDelete(false)
                      setDeleteContext(null)
                  }}
                  onConfirm={deleteContext.onConfirm}
              />
          )}

          {/* Debug info */}
          {process.env.NODE_ENV === "development" && (
              <div className="fixed bottom-4 right-4 bg-black/70 text-white p-2 text-xs rounded">
                  <div>Departments: {departments.length}</div>
                  <div>Editing: {showEditModal.toString()}</div>
                  <div>Selected: {selectedDepartment?.name || "none"}</div>
              </div>
          )}
      </div>
  )
}

export default DepartmentView
