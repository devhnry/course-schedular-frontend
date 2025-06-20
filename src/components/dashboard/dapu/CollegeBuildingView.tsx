import {useState} from "react"
import toast from "react-hot-toast"
import Button from "../../shared/Button.tsx"
import {useCollegeBuildings} from "../../../hooks/useCollegeBuilding.ts"
import DataTable from "../common/DataTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import CreateCollegeBuildingModal from "./modals/CreateCollegeBuildingModal.tsx"
import EditCollegeBuildingModal from "./modals/EditCollegeBuildingModal.tsx"
import {Building2, Edit, Trash2} from "lucide-react"
import type {CollegeBuildingResponseDto} from "../../../types/collegeBuilding.ts"

const CollegeBuildingView = () => {
    const { buildings, loading, error, remove } = useCollegeBuildings()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedBuilding, setSelectedBuilding] = useState<CollegeBuildingResponseDto | null>(null)

    const handleEdit = (building: CollegeBuildingResponseDto) => {
        setSelectedBuilding(building)
        setShowEditModal(true)
    }

    const handleDelete = async (building: CollegeBuildingResponseDto) => {
        if (window.confirm(`Are you sure you want to delete ${building.name}?`)) {
            await remove(building.id)
            toast.success("Building deleted successfully")
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
            render: (building: CollegeBuildingResponseDto) => (
                <div className="font-medium text-gray-900">{building.name}</div>
            ),
        },
        {
            key: "code",
            label: "Code",
            render: (building: CollegeBuildingResponseDto) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {building.code}
        </span>
            ),
        },
        {
            key: "college",
            label: "College",
            render: (building: CollegeBuildingResponseDto) => building.college?.name || "—",
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
                    <p className="text-red-600 font-medium">Error loading buildings</p>
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <PageHeader
                title="Manage College Buildings"
                description="View and manage all university college buildings"
                icon={Building2}
                actions={
                    <Button
                        text="Add New Building"
                        classname="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md"
                        onClick={() => setShowCreateModal(true)}
                    />
                }
            />

            <DataTable
                data={buildings}
                columns={columns}
                actions={actions}
                loading={loading}
                emptyMessage="No buildings found. Create your first building to get started."
                keyExtractor={(building) => building.id}
            />

            <CreateCollegeBuildingModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={() => {
                    // Data will be refreshed automatically by the hook
                }}
            />

            <EditCollegeBuildingModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false)
                    setSelectedBuilding(null)
                }}
                building={selectedBuilding}
                onSuccess={() => {
                    // Data will be refreshed automatically by the hook
                }}
            />
        </div>
    )
}

export default CollegeBuildingView
