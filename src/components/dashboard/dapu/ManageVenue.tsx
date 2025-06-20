import {useState} from "react"
import toast from "react-hot-toast"
import Button from "../../shared/Button.tsx"
import {useVenues} from "../../../hooks/useVenue.ts"
import DataTable from "../common/DataTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import CreateVenueModal from "./modals/CreateVenueModal.tsx"
import EditVenueModal from "./modals/EditVenueModal.tsx"
import {Edit, MapPin, Trash2} from "lucide-react"
import type {VenueResponseDto} from "../../../types/venue.ts"

const ManageVenue = () => {
  const { venues, loading, error, remove } = useVenues()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState<VenueResponseDto | null>(null)

  const handleEdit = (venue: VenueResponseDto) => {
    setSelectedVenue(venue)
    setShowEditModal(true)
  }

  const handleDelete = async (venue: VenueResponseDto) => {
    if (window.confirm(`Are you sure you want to delete ${venue.name}?`)) {
      await remove(venue.id)
      toast.success("Venue deleted successfully")
    }
  }

  const columns = [
    {
      key: "index",
      label: "S/N",
      render: (_: any, index: number) => index + 1,
      className: "w-16",
    },
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
            keyExtractor={(venue) => venue.id}
        />

        <CreateVenueModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              // Data will be refreshed automatically by the hook
            }}
        />

        <EditVenueModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false)
              setSelectedVenue(null)
            }}
            venue={selectedVenue}
            onSuccess={() => {
              // Data will be refreshed automatically by the hook
            }}
        />
      </div>
  )
}

export default ManageVenue
