import {useState} from "react";
import {toast} from "react-hot-toast";
import {MoreVertical} from "lucide-react";
import {useCourseAssignments} from "../../../hooks/useCourseAssignment.ts";
import Button from "../../shared/Button.tsx";

export interface CourseAssignmentResponseDto {
    id: number;
    courseCode: string;
    courseTitle: string;
    programName: string;
    departmentCode: string;
    collegeCode: string;
    lecturerNames: string[];
    buildingCode: string;
}

const CourseAssignmentView = () => {
    const [showDropdownFor, setShowDropdownFor] = useState<number | null>(null);
    const {  assignments, loading, remove, refetch} = useCourseAssignments()

    const handleDelete = async (id: number) => {
        try {
            await remove(id);
            toast.success("Assignment deleted");
            await refetch()
        } catch (e: any) {
            toast.error("Could not delete assignment");
        }
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Course Assignments</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border rounded-md overflow-hidden">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3 border">Course</th>
                            <th className="p-3 border">Program</th>
                            <th className="p-3 border">Lecturers</th>
                            <th className="p-3 border">Building</th>
                            <th className="p-3 border text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {assignments.map((a) => (
                            <tr key={a.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{a.courseCode} - {a.courseTitle}</td>
                                <td className="p-3 border">{a.programName}</td>
                                <td className="p-3 border">{a.lecturerNames.join(", ")}</td>
                                <td className="p-3 border">{a.buildingCode || "-"}</td>
                                <td className="p-3 border text-center relative">
                                    <button
                                        onClick={() =>
                                            setShowDropdownFor((prev) => (prev === a.id ? null : a.id))
                                        }
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                    >
                                        <MoreVertical size={18} />
                                    </button>
                                    {showDropdownFor === a.id && (
                                        <div className="absolute right-2 top-8 bg-white border shadow-md z-10 rounded-md">
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    toast("Edit coming soon");
                                                    setShowDropdownFor(null);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(a.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-6">
                <Button
                    text="Assign Course"
                    classname="bg-black text-white px-4 py-2 font-semibold"
                    onClick={() => toast("Assignment creation coming soon")}
                />
            </div>
        </div>
    );
};

export default CourseAssignmentView;
