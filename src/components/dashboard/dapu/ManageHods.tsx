import InviteHodForm from "./InviteHodForm.tsx"
import ManageHodTable from "./ManageHodTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import {Users} from "lucide-react"

const ManageHods = () => {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Manage HODs"
        description="Invite and manage Head of Department access and permissions"
        icon={Users}
      />

      {/* Invite New HOD Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Invite New HOD</h2>
          <p className="text-sm text-gray-600 mt-1">Send an invitation to a new Head of Department</p>
        </div>
        <InviteHodForm />
      </div>

      {/* Manage HODs Section */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Current HODs</h2>
          <p className="text-sm text-gray-600 mt-1">View and manage existing head of departments</p>
        </div>
        <ManageHodTable />
      </div>
    </div>
  )
}

export default ManageHods
