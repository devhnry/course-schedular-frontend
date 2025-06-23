import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {useLecturer} from "../../../../hooks/useLecturer"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {LecturerRequestDto, LecturerResponseDto} from "../../../../types/lecturer"

interface EditLecturerModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    lecturer: LecturerResponseDto | null
}

const EditLecturerModal = ({ isOpen, onClose, onSuccess, lecturer }: EditLecturerModalProps) => {
    const [loading, setLoading] = useState(false)
    const { update } = useLecturer()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<LecturerRequestDto>()

    // Populate form when lecturer changes
    useEffect(() => {
        if (lecturer && isOpen) {
            setValue("fullName", lecturer.fullName)
        }
    }, [lecturer, isOpen, setValue])

    const onSubmit = async (data: LecturerRequestDto) => {
        if (!lecturer) return

        try {
            setLoading(true)
            await update(lecturer.id, data)
            toast.success("Lecturer updated successfully!")
            reset()
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to update lecturer")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !lecturer) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Lecturer</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <TextInput label="Full Name" name="fullName" placeholder="e.g., Dr. John Smith" register={register} />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            text="Cancel"
                            classname="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                            onClick={onClose}
                        />
                        <Button
                            type="submit"
                            text={loading ? "Updating..." : "Update Lecturer"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditLecturerModal
