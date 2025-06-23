import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {usePrograms} from "../../../../hooks/useProgram"
import {useDepartments} from "../../../../hooks/useDepartments"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {ProgramRequestDto, ProgramResponseDto} from "../../../../types/program"

interface EditProgramModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    program: ProgramResponseDto | null
}

const EditProgramModal = ({ isOpen, onClose, onSuccess, program }: EditProgramModalProps) => {
    const [loading, setLoading] = useState(false)
    const { update } = usePrograms()
    const { departments } = useDepartments()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ProgramRequestDto>()

    useEffect(() => {
        if (program && isOpen) {
            setValue("name", program.name)
            setValue("departmentCode", program.departmentCode)
        }
    }, [program, isOpen, setValue])

    const onSubmit = async (data: ProgramRequestDto) => {
        if (!program) return

        try {
            setLoading(true)
            await update(program.id, data)
            toast.success("Program updated successfully!")
            reset()
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to update program")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !program) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Program</h2>
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
                            text={loading ? "Updating..." : "Update Program"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProgramModal
