import {useEffect, useState} from "react";
import {MoreVertical} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../shared/Button";
import {useCourses} from "../../../hooks/useCourse";

const CoursesView = () => {
    const { courses, loading, error, remove } = useCourses();
    const [showDropdownFor, setShowDropdownFor] = useState<number | null>(null);

    const toggleDropdown = (id: number) => {
        setShowDropdownFor(prev => (prev === id ? null : id));
    };

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>

            {loading ? (
                <p>Loading Courses...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border rounded-md overflow-hidden">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3 border">#</th>
                            <th className="p-3 border">Code</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Level</th>
                            <th className="p-3 border">Credits</th>
                            <th className="p-3 border">Program</th>
                            <th className="p-3 border">Dept</th>
                            <th className="p-3 border">College</th>
                            <th className="p-3 border">Expected</th>
                            <th className="p-3 border">Tags</th>
                            <th className="p-3 border text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{index + 1}</td>
                                <td className="p-3 border">{course.courseCode}</td>
                                <td className="p-3 border">{course.courseName}</td>
                                <td className="p-3 border">{course.level}</td>
                                <td className="p-3 border">{course.credits}</td>
                                <td className="p-3 border">{course.programName}</td>
                                <td className="p-3 border">{course.departmentName}</td>
                                <td className="p-3 border">{course.collegeName}</td>
                                <td className="p-3 border">{course.expectedStudents || "-"}</td>
                                <td className="p-3 border">
                                    {course.isGeneralCourse && <span className="text-xs text-white bg-purple-500 rounded px-2">GEN</span>} {" "}
                                    {course.isSportsCourse && <span className="text-xs text-white bg-green-500 rounded px-2">SPORT</span>}
                                </td>
                                <td className="p-3 border text-center relative">
                                    <button
                                        onClick={() => toggleDropdown(course.id)}
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                    >
                                        <MoreVertical size={18} />
                                    </button>
                                    {showDropdownFor === course.id && (
                                        <div className="absolute right-2 top-8 bg-white border shadow-md z-10 rounded-md">
                                            <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    toast("Edit Course (coming soon)");
                                                    setShowDropdownFor(null);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                                onClick={() => {
                                                    remove(course.id).then(() => {
                                                        toast.success("Course deleted");
                                                        setShowDropdownFor(null);
                                                    });
                                                }}
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
                <Button text="Add New Course" classname="bg-black text-white px-4 py-2 font-semibold" onClick={() => toast("Show Create Modal (coming soon)")} />
            </div>
        </div>
    );
};

export default CoursesView;
