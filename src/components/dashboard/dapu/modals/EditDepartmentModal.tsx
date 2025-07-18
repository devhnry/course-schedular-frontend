import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {useDepartments} from "../../../../hooks/useDepartments"
import {useCollegeBuildings} from "../../../../hooks/useCollegeBuilding"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {DepartmentRequestDto, DepartmentResponseDto} from "../../../../types/department"

interface EditDepartmentModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    department: DepartmentResponseDto | null
}

const EditDepartmentModal = ({ isOpen, onClose, onSuccess, department }: EditDepartmentModalProps) => {
    const [loading, setLoading] = useState(false)
    const { update } = useDepartments()
    const { buildings } = useCollegeBuildings()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<DepartmentRequestDto>()

    useEffect(() => {
        if (department && isOpen) {
            setValue("name", department.name)
            setValue("code", department.code)
            setValue("collegeBuildingCode", department.collegeBuildingCode)
        }
    }, [department, isOpen, setValue])

    const onSubmit = async (data: DepartmentRequestDto) => {
        if (!department) return

        try {
            setLoading(true)
            await update(department.id, data)
            toast.success("Department updated successfully!")
            reset()
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to update department")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !department) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Department</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <TextInput label="Department Name" name="name" placeholder="e.g., Computer Science" register={register} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <TextInput label="Department Code" name="code" placeholder="e.g., CSC" register={register} />
                    {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}

                    <div>
                        <label className="text-sm mb-1 block">College Building</label>
                        <select
                            {...register("collegeBuildingCode", { required: "College Building is required" })}
                            className="w-full border p-3 border-black/20 outline-none rounded-md text-sm"
                        >
                            <option value="">Select College Building</option>
                            {buildings.map((building) => (
                                <option key={building.id} value={building.code}>
                                    {building.name} ({building.code})
                                </option>
                            ))}
                        </select>
                        {errors.collegeBuildingCode && <p className="text-red-500 text-sm">{errors.collegeBuildingCode.message}</p>}
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
                            text={loading ? "Updating..." : "Update Department"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditDepartmentModal
