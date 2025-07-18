import { AlertTriangle, X } from "lucide-react"

interface ConfirmDeleteModalProps {
    isOpen: boolean
    itemLabel: string // e.g. "venue", "department", "lecturer"
    itemName: string // e.g. "Lecture Hall A", "Computer Science"
    onClose: () => void
    onConfirm: () => void
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, itemLabel, itemName, onClose, onConfirm }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/50 h-full flex items-center justify-center px-2">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-4 relative">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="text-red-600" size={24} />
                    <h2 className="text-lg font-semibold text-gray-800">Delete {itemLabel}</h2>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                    Are you sure you want to delete this {itemLabel.toLowerCase()}:
                    <span className="font-semibold"> {itemName}</span>?
                </p>

                <div className="flex justify-end gap-2 *:cursor-pointer">
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-sm border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-3 py-1.5 rounded-sm bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal
