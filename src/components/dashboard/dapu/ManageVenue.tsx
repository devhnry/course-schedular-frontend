import type React from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import Button from "../../shared/Button"
import { useVenues } from "../../../hooks/useVenue"
import DataTable from "../common/DataTable"
import PageHeader from "../common/PageHeader"
import CreateVenueModal from "./modals/CreateVenueModal"
import EditVenueModal from "./modals/EditVenueModal"
import { Edit, MapPin, Trash2 } from "lucide-react"
import type { VenueResponseDto } from "../../../types/venue"
import ConfirmDeleteModal from "../../shared/ConfirmDeleteModal.tsx";

const ManageVenue: React.FC = () => {
    const { venues, loading, error, remove } = useVenues()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedVenue, setSelectedVenue] = useState<VenueResponseDto | null>(null)

    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [deleteContext, setDeleteContext] = useState<{ label: string; name: string; onConfirm: () => void } | null>(null)


    const handleEdit = (venue: VenueResponseDto) => {
        console.log("Edit clicked for venue:", venue)
        setSelectedVenue(venue)
        setShowEditModal(true)
    }

    // const handleDelete = async (venue: VenueResponseDto) => {
    //     console.log("Delete clicked for venue:", venue)
    //     if (window.confirm(`Are you sure you want to delete ${venue.name}?`)) {
    //         try {
    //             await remove(venue.id)
    //             toast.success("Venue deleted successfully")
    //         } catch (error: any) {
    //             console.error("Delete error:", error)
    //             toast.error(error?.response?.data?.statusMessage || "Failed to delete venue")
    //         }
    //     }
    // }

    const handleDelete = (venue: VenueResponseDto) => {
        setDeleteContext({
            label: "venue",
            name: venue.name,
            onConfirm: async () => {
                try {
                    await remove(venue.id)
                    toast.success("Venue deleted successfully")
                } catch (error: any) {
                    toast.error(error?.response?.data?.statusMessage || "Failed to delete venue")
                } finally {
                    setDeleteContext(null)
                    setShowConfirmDelete(false)
                }
            },
        })
        setShowConfirmDelete(true)
    }


    const handleCreateSuccess = () => {
        setShowCreateModal(false)
        // toast.success("Venue created successfully")
    }

    const handleEditSuccess = () => {
        setShowEditModal(false)
        setSelectedVenue(null)
        toast.success("Venue updated successfully")
    }

    const columns = [
        // {
        //     key: "index",
        //     label: "S/N",
        //     render: (_: any, index: number) => index + 1,
        //     className: "w-16",
        // },
        {
            key: "name",
            label: "Name",
            render: (venue: VenueResponseDto) => <div className="font-medium text-gray-900">{venue.name}</div>,
        },
        {
            key: "capacity",
            label: "Capacity",
            render: (venue: VenueResponseDto) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {venue.capacity}
        </span>
            ),
        },
        {
            key: "collegeBuildingName",
            label: "College Building",
            render: (venue: VenueResponseDto) => (
                <div className="text-gray-900">{venue.collegeBuildingName || venue.collegeBuildingCode}</div>
            ),
        },
        {
            key: "available",
            label: "Available",
            render: (venue: VenueResponseDto) => (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        venue.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                >
          {venue.available ? "Yes" : "No"}
        </span>
            ),
        },
    ]

    const actions = [
        {
            label: "Edit",
            onClick: (venue: VenueResponseDto) => {
                console.log("Action Edit clicked:", venue)
                handleEdit(venue)
            },
            icon: <Edit size={16} />,
            className: "text-gray-700 hover:text-gray-900",
        },
        {
            label: "Delete",
            onClick: (venue: VenueResponseDto) => {
                console.log("Action Delete clicked:", venue)
                handleDelete(venue)
            },
            icon: <Trash2 size={16} />,
            className: "text-red-600 hover:text-red-800",
        },
    ]

    console.log("ManageVenue render:", { venues, loading, error, showEditModal, selectedVenue })

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-600 font-medium">Error loading venues</p>
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <PageHeader
                title="Manage Venues"
                description="View and manage all university venues and lecture halls"
                icon={MapPin}
                actions={
                    <Button
                        text="Add New Venue"
                        classname="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md"
                        onClick={() => setShowCreateModal(true)}
                    />
                }
            />

            <DataTable
                data={venues}
                columns={columns}
                actions={actions}
                loading={loading}
                emptyMessage="No venues found. Create your first venue to get started."
                keyExtractor={(venue) => venue.id.toString()}
            />

            {/* Create Venue Modal */}
            {showCreateModal && (
                <CreateVenueModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={handleCreateSuccess}
                />
            )}

            {/* Edit Venue Modal */}
            {showEditModal && selectedVenue && (
                <EditVenueModal
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false)
                        setSelectedVenue(null)
                    }}
                    venue={selectedVenue}
                    onSuccess={handleEditSuccess}
                />
            )}

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
                    <div>Venues: {venues.length}</div>
                    <div>Editing: {showEditModal.toString()}</div>
                    <div>Selected: {selectedVenue?.name || "none"}</div>
                </div>
            )}
        </div>
    )
}

export default ManageVenue
