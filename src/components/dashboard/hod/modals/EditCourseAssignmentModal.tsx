import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {Trash2, X} from "lucide-react"
import {useCourseAssignments} from "../../../../hooks/useCourseAssignment"
import {useCourses} from "../../../../hooks/useCourse"
import {useLecturer} from "../../../../hooks/useLecturer"
import {useCollegeBuildings} from "../../../../hooks/useCollegeBuilding"
import Button from "../../../shared/Button"
import toast from "react-hot-toast"
import type {CourseAssignmentRequestDto, CourseAssignmentResponseDto} from "../../../../types/courseAssignment"

interface EditCourseAssignmentModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    assignment: CourseAssignmentResponseDto | null
}

const EditCourseAssignmentModal = ({ isOpen, onClose, onSuccess, assignment }: EditCourseAssignmentModalProps) => {
    const [loading, setLoading] = useState(false)
    const [selectedLecturers, setSelectedLecturers] = useState<string[]>([])
    const { update } = useCourseAssignments()
    const { courses } = useCourses()
    const { lecturers } = useLecturer()
    const { buildings } = useCollegeBuildings()

    const { register, handleSubmit, reset, setValue } = useForm<CourseAssignmentRequestDto>()

    // Populate form when assignment changes
    useEffect(() => {
        if (assignment && isOpen) {
            setValue("courseCode", assignment.courseCode)
            setValue("overrideBuildingCode", assignment.buildingCode || "")
            setSelectedLecturers(assignment.lecturerNames)
            setValue("lecturerNames", assignment.lecturerNames)
        }
    }, [assignment, isOpen, setValue])

    const addLecturer = (lecturerName: string) => {
        if (lecturerName && !selectedLecturers.includes(lecturerName)) {
            const newLecturers = [...selectedLecturers, lecturerName]
            setSelectedLecturers(newLecturers)
            setValue("lecturerNames", newLecturers)
        }
    }

    const removeLecturer = (lecturerName: string) => {
        const newLecturers = selectedLecturers.filter((name) => name !== lecturerName)
        setSelectedLecturers(newLecturers)
        setValue("lecturerNames", newLecturers)
    }

    const onSubmit = async (data: CourseAssignmentRequestDto) => {
        if (!assignment) return

        if (selectedLecturers.length === 0) {
            toast.error("Please select at least one lecturer")
            return
        }

        try {
            setLoading(true)
            await update(assignment.id, {
                ...data,
                lecturerNames: selectedLecturers,
                overrideBuildingCode: data.overrideBuildingCode || null,
            })
            toast.success("Course assignment updated successfully!")
            reset()
            setSelectedLecturers([])
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to update course assignment")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !assignment) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Course Assignment</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="text-sm mb-1 block">Course</label>
                        <select
                            {...register("courseCode", { required: "Course is required" })}
                            className="w-full border p-3 border-black/20 outline-none rounded-md text-sm"
                        >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.courseCode}>
                                    {course.courseCode} - {course.courseName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm mb-1 block">Lecturers</label>
                        <div className="space-y-2">
                            <select
                                onChange={(e) => {
                                    if (e.target.value) {
                                        addLecturer(e.target.value)
                                        e.target.value = ""
                                    }
                                }}
                                className="w-full border p-3 border-black/20 outline-none rounded-md text-sm"
                            >
                                <option value="">Add Lecturer</option>
                                {lecturers
                                    .filter((lecturer) => !selectedLecturers.includes(lecturer.fullName))
                                    .map((lecturer) => (
                                        <option key={lecturer.id} value={lecturer.fullName}>
                                            {lecturer.fullName}
                                        </option>
                                    ))}
                            </select>

                            {selectedLecturers.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">Selected Lecturers:</p>
                                    {selectedLecturers.map((name) => (
                                        <div key={name} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                            <span className="text-sm">{name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeLecturer(name)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm mb-1 block">Override Building (Optional)</label>
                        <select
                            {...register("overrideBuildingCode")}
                            className="w-full border p-3 border-black/20 outline-none rounded-md text-sm"
                        >
                            <option value="">Use Default Building</option>
                            {buildings.map((building) => (
                                <option key={building.id} value={building.code}>
                                    {building.name} ({building.code})
                                </option>
                            ))}
                        </select>
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
                            text={loading ? "Updating..." : "Update Assignment"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCourseAssignmentModal
