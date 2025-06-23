import {useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {usePrograms} from "../../../../hooks/useProgram"
import {useDepartments} from "../../../../hooks/useDepartments"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {ProgramRequestDto} from "../../../../types/program"

interface CreateProgramModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

const CreateProgramModal = ({ isOpen, onClose, onSuccess }: CreateProgramModalProps) => {
    const [loading, setLoading] = useState(false)
    const { create } = usePrograms()
    const { departments } = useDepartments()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProgramRequestDto>()

    const onSubmit = async (data: ProgramRequestDto) => {
        try {
            setLoading(true)
            await create(data)
            toast.success("Program created successfully!")
            reset()
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to create program")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Program</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <TextInput label="Program Name" name="name" placeholder="e.g., Computer Science" register={register} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <div>
                        <label className="text-sm mb-1 block">Department</label>
                        <select
                            {...register("departmentCode", { required: "Department is required" })}
                            className="w-full border p-3 border-black/20 outline-none rounded-md text-sm"
                        >
                            <option value="">Select Department</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.code}>
                                    {department.name} ({department.code})
                                </option>
                            ))}
                        </select>
                        {errors.departmentCode && <p className="text-red-500 text-sm">{errors.departmentCode.message}</p>}
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
                            text={loading ? "Creating..." : "Create Program"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProgramModal
