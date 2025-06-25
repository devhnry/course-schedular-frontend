import {useHods} from "../../../hooks/useHods.ts"
import {CheckCircle, ChevronLeft, ChevronRight, Clock, Loader2, Mail, Trash2, XCircle} from "lucide-react"

export default function ManageHodTable() {
    const { data, loading, error, page, setPage, updateAccess, deleteHod } = useHods(0, 10)

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "ACCEPTED":
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case "PENDING":
                return <Clock className="h-4 w-4 text-yellow-500" />
            case "EXPIRED":
                return <XCircle className="h-4 w-4 text-red-500" />
            default:
                return <Clock className="h-4 w-4 text-gray-500" />
        }
    }
    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
        switch (status) {
            case "ACCEPTED":
                return `${baseClasses} bg-green-100 text-green-800`
            case "PENDING":
                return `${baseClasses} bg-yellow-100 text-yellow-800`
            case "EXPIRED":
                return `${baseClasses} bg-red-100 text-red-800`
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-600">Loading HODs...</span>
                </div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
                <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span className="font-medium">Error loading data</span>
                </div>
                <p className="text-red-600 mt-1">{error}</p>
            </div>
        )
    }

    const tabs = ['Email Address', 'Department', 'Status', 'Write Access', 'Actions']

    return (
        <div className="bg-white rounded-lg shadow-sm border-gray-200">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {tabs.map((tab, index) => (
                                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase">
                                    <div className={`flex items-center gap-2`}>
                                        {tab == "Email Address" && (<Mail className={`size-4`} />)}
                                        {tab}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data?.content.map((h, index) => (
                            <tr key={index} className={`hover:bg-gray-50 transition-colors`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{h.emailAddress}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{h.departmentName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getStatusBadge(h.status)}>{getStatusIcon(h.status)}
                                        {h.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={!!h.writeAccess}
                                            onChange={() => updateAccess(h.userId!, !h.writeAccess!)}
                                            disabled={h.status !== "ACCEPTED"}
                                            className="sr-only peer"
                                        />
                                        <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                            h.status !== "ACCEPTED"
                                                ? "bg-gray-200 cursor-not-allowed"
                                                : h.writeAccess
                                                    ? "bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300"
                                                    : "bg-gray-200 peer-focus:ring-4 peer-focus:ring-gray-300"
                                        } `}>
                                            <div className={` absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 ease-in-out ${h.writeAccess ? "translate-x-full border-white" : "translate-x-0"} `}>
                                            </div>
                                        </div>

                                        <span className="ml-3 text-sm text-gray-700">{h.writeAccess ? "Enabled" : "Disabled"}</span>
                                    </label>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => deleteHod(h.userId ?? h.emailAddress)}
                                        disabled={h.status === "PENDING"}
                                        className={`inline-flex ${h.status === 'PENDING' ? 'cursor-not-allowed text-red-600/50 ' : 'cursor-pointer text-red-600 hover:bg-red-100 hover:border-red-300'} items-center gap-1 px-3 py-1.5 text-sm font-medium bg-red-50 border border-red-200 rounded-md  transition-colors focus:outline-none`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {data?.content.length === 0 && (
                <div className="text-center py-20">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No HODs found</h3>
                    <p className="text-gray-500">There are no head of departments to display.</p>
                </div>
            )}

            {/* Pagination */}
            {data && data.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing page <span className="font-medium">{page + 1}</span> of{" "}
                            <span className="font-medium">{data.totalPages}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 0}
                                className={` inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                                    page === 0
                                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                                }`}>
                                    <ChevronLeft className="h-4 w-4" /> Previous
                            </button>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page + 1 >= (data?.totalPages || 0)}
                                className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                                    page + 1 >= (data?.totalPages || 0)
                                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                                }`} >
                                Next <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
