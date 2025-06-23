import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {useCollegeBuildings} from "../../../../hooks/useCollegeBuilding"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {CollegeBuildingRequestDto, CollegeBuildingResponseDto} from "../../../../types/collegeBuilding"

interface EditCollegeBuildingModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    building: CollegeBuildingResponseDto | null
}

// Mock colleges data - in a real app, this would come from an API
const colleges = [
    { code: "CEET", name: "College of Engineering and Technology" },
    { code: "CST", name: "College of Science and Technology" },
    { code: "CDS", name: "College of Development Studies" },
    { code: "CBSS", name: "College of Business and Social Sciences" },
    { code: "CHMS", name: "College of Human Medicine and Sciences" },
]

const EditCollegeBuildingModal = ({ isOpen, onClose, onSuccess, building }: EditCollegeBuildingModalProps) => {
    const [loading, setLoading] = useState(false)
    const { update } = useCollegeBuildings()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<CollegeBuildingRequestDto>()

    useEffect(() => {
        if (building && isOpen) {
            setValue("name", building.name)
            setValue("code", building.code)
            setValue("collegeCode", building.college?.code || "")
        }
    }, [building, isOpen, setValue])

    const onSubmit = async (data: CollegeBuildingRequestDto) => {
        if (!building) return

        try {
            setLoading(true)
            await update(building.id, data)
            toast.success("College Building updated successfully!")
            reset()
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to update college building")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !building) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Edit College Building</h2>
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
                            text={loading ? "Updating..." : "Update Building"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCollegeBuildingModal
