import {useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {useDepartments} from "../../../../hooks/useDepartments"
import {useCollegeBuildings} from "../../../../hooks/useCollegeBuilding"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {DepartmentRequestDto} from "../../../../types/department"
import PortalDropdown from "../../common/PortalDropdown.tsx";

interface CreateDepartmentModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

const CreateDepartmentModal = ({ isOpen, onClose, onSuccess }: CreateDepartmentModalProps) => {
    const [loading, setLoading] = useState(false)
    const { create, refetch } = useDepartments()
    const { buildings } = useCollegeBuildings()
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DepartmentRequestDto>()

    const onSubmit = async (data: DepartmentRequestDto) => {
        try {
            setLoading(true)
            await create(data)
            toast.success("Department created successfully!")
            reset()
            refetch().catch(e => console.error(e))
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to create department")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Department</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <TextInput label="Department Name" name="name" placeholder="e.g., Computer Science" register={register} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <TextInput label="Department Code" name="code" placeholder="e.g., CSC" register={register} />
                    {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}

                    <PortalDropdown
                        name="collegeBuildingCode"
                        label="College Building"
                        value={watch("collegeBuildingCode")}
                        onChange={(e) => setValue("collegeBuildingCode", e.target.value)}
                        options={buildings.map((b) => ({
                            value: b.code,
                            label: `${b.name} (${b.code})`,
                        }))}
                        error={errors.collegeBuildingCode?.message}
                        placeholder="Choose a building"
                    />

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            text="Cancel"
                            classname="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                            onClick={onClose}
                        />
                        <Button
                            type="submit"
                            text={loading ? "Creating..." : "Create Department"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateDepartmentModal
