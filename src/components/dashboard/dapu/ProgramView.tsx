import {useState} from "react"
import toast from "react-hot-toast"
import Button from "../../shared/Button.tsx"
import {usePrograms} from "../../../hooks/useProgram.ts"
import DataTable from "../common/DataTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import CreateProgramModal from "./modals/CreateProgramModal.tsx"
import EditProgramModal from "./modals/EditProgramModal.tsx"
import {Book, Edit, Trash2} from "lucide-react"
import type {ProgramResponseDto} from "../../../types/program.ts"

const ProgramView = () => {
    const { programs, loading, error, remove } = usePrograms()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedProgram, setSelectedProgram] = useState<ProgramResponseDto | null>(null)

    const handleEdit = (program: ProgramResponseDto) => {
        setSelectedProgram(program)
        setShowEditModal(true)
    }

    const handleDelete = async (program: ProgramResponseDto) => {
        if (window.confirm(`Are you sure you want to delete ${program.name}?`)) {
            await remove(program.id)
            toast.success("Program deleted successfully")
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
            render: (program: ProgramResponseDto) => <div className="font-medium text-gray-900">{program.name}</div>,
        },
        {
            key: "departmentName",
            label: "Department",
            render: (program: ProgramResponseDto) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {program.departmentName}
        </span>
            ),
        },
        {
            key: "collegeName",
            label: "College",
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
                    <p className="text-red-600 font-medium">Error loading programs</p>
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <PageHeader
                title="Manage Programs"
                description="View and manage all university academic programs"
                icon={Book}
                actions={
                    <Button
                        text="Add New Program"
                        classname="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md"
                        onClick={() => setShowCreateModal(true)}
                    />
                }
            />

            <DataTable
                data={programs}
                columns={columns}
                actions={actions}
                loading={loading}
                emptyMessage="No programs found. Create your first program to get started."
                keyExtractor={(program) => program.id}
            />

            <CreateProgramModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={() => {
                    // Data will be refreshed automatically by the hook
                }}
            />

            <EditProgramModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false)
                    setSelectedProgram(null)
                }}
                program={selectedProgram}
                onSuccess={() => {
                    // Data will be refreshed automatically by the hook
                }}
            />
        </div>
    )
}

export default ProgramView
