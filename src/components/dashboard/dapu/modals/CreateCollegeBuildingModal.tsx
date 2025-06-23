import {useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {useCollegeBuildings} from "../../../../hooks/useCollegeBuilding"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {CollegeBuildingRequestDto} from "../../../../types/collegeBuilding"

interface CreateCollegeBuildingModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

// Mock colleges data - in a real app, this would come from the API Later
const colleges = [
    { code: "CoE", name: "College of Engineering" },
    { code: "CST", name: "College of Science and Technology" },
    { code: "CLDS", name: "College of Leadership and Development Studies" },
    { code: "CMSS", name: "College of Management and Social Studies" },
]

const CreateCollegeBuildingModal = ({ isOpen, onClose, onSuccess }: CreateCollegeBuildingModalProps) => {
    const [loading, setLoading] = useState(false)
    const { create } = useCollegeBuildings()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CollegeBuildingRequestDto>()

    const onSubmit = async (data: CollegeBuildingRequestDto) => {
        try {
            setLoading(true)
            await create(data)
            toast.success("College Building created successfully!")
            reset()
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to create college building")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Create New College Building</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <TextInput label="Building Name" name="name" placeholder="e.g., Engineering Complex" register={register} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <TextInput label="Building Code" name="code" placeholder="e.g., ENG" register={register} />
                    {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}

                    <div>
                        <label className="text-sm mb-1 block">College</label>
                        <select
                            {...register("collegeCode", { required: "College is required" })}
                            className="w-full border p-3 border-black/20 outline-none rounded-md text-sm"
                        >
                            <option value="">Select College</option>
                            {colleges.map((college) => (
                                <option key={college.code} value={college.code}>
                                    {college.name} ({college.code})
                                </option>
                            ))}
                        </select>
                        {errors.collegeCode && <p className="text-red-500 text-sm">{errors.collegeCode.message}</p>}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            text="Cancel"
                            classname="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                            onClick={onClose}
                        />
                        <Button
                            type="submit"
                            text={loading ? "Creating..." : "Create Building"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCollegeBuildingModal
