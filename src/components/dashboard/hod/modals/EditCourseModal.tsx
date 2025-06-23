import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {useCourses} from "../../../../hooks/useCourse"
import {usePrograms} from "../../../../hooks/useProgram"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {CourseRequestDto, CourseResponseDto} from "../../../../types/course"

interface EditCourseModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    course: CourseResponseDto | null
}

const EditCourseModal = ({ isOpen, onClose, onSuccess, course }: EditCourseModalProps) => {
    const [loading, setLoading] = useState(false)
    const { update } = useCourses()
    const { programs } = usePrograms()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<CourseRequestDto>()

    // Populate form when course changes
    useEffect(() => {
        if (course && isOpen) {
            setValue("courseCode", course.courseCode)
            setValue("courseName", course.courseName)
            setValue("credits", course.credits)
            setValue("programName", course.programName)
            setValue("expectedStudents", course.expectedStudents || 0)
        }
    }, [course, isOpen, setValue])

    const onSubmit = async (data: CourseRequestDto) => {
        if (!course) return

        try {
            setLoading(true)
            await update(course.id, data)
            toast.success("Course updated successfully!")
            reset()
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to update course")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !course) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Course</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <TextInput label="Course Code" name="courseCode" placeholder="e.g., CSC 401" register={register} />
                    {errors.courseCode && <p className="text-red-500 text-sm">{errors.courseCode.message}</p>}

                    <TextInput
                        label="Course Name"
                        name="courseName"
                        placeholder="e.g., Software Engineering"
                        register={register}
                    />
                    {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName.message}</p>}

                    <TextInput label="Credits" name="credits" type="number" placeholder="e.g., 3" register={register} />
                    {errors.credits && <p className="text-red-500 text-sm">{errors.credits.message}</p>}

                    <div>
                        <label className="text-sm mb-1 block">Program</label>
                        <select
                            {...register("programName", { required: "Program is required" })}
                            className="w-full border p-3 border-black/20 outline-none rounded-md text-sm"
                        >
                            <option value="">Select Program</option>
                            {programs.map((program) => (
                                <option key={program.id} value={program.name}>
                                    {program.name}
                                </option>
                            ))}
                        </select>
                        {errors.programName && <p className="text-red-500 text-sm">{errors.programName.message}</p>}
                    </div>

                    <TextInput
                        label="Expected Students (Optional)"
                        name="expectedStudents"
                        type="number"
                        placeholder="e.g., 50"
                        register={register}
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
                            text={loading ? "Updating..." : "Update Course"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCourseModal
