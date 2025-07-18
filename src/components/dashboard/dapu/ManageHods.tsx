import InviteHodForm from "./InviteHodForm.tsx"
import ManageHodTable from "./ManageHodTable.tsx"
import PageHeader from "../common/PageHeader.tsx"
import { Users, X } from "lucide-react"
import { useEffect, useState } from "react"
import Button from "../../shared/Button.tsx"

const ManageHods = () => {
    const [isInviteOpen, setIsInviteOpen] = useState(false)

    useEffect(() => {
        if (isInviteOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = ""
        }
    }, [isInviteOpen])

    const handleInviteSuccess = () => {
        setIsInviteOpen(false)
    }

    return (
        <div className="p-6 space-y-2">
            <PageHeader
                title="Manage HODs"
                description="Invite and manage Head of Department access and permissions"
                icon={Users}
            />

            <Button
                text="+ Invite HOD"
                onClick={() => setIsInviteOpen(true)}
                classname="px-4 py-3 max-w-[150px] w-full bg-black text-white font-medium text-[15px] hover:bg-black/90 transition"
            />

            {/* Manage HODs Section */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Current HODs</h2>
                    <p className="text-sm text-gray-600 mt-1">View and manage existing head of departments</p>
                </div>
                <ManageHodTable />
            </div>

            {/* Invite Modal */}
            {isInviteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsInviteOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Invite New HOD</h2>
                        <p className="text-sm text-gray-600 mb-4">Send an invitation to a new Head of Department</p>

                        <InviteHodForm onSuccess={handleInviteSuccess} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageHods
