import {useState} from "react";
import {MoreVertical} from "lucide-react";
import toast from "react-hot-toast";
import {useLecturer} from "../../../hooks/useLecturer.ts";
import Button from "../../shared/Button.tsx";

const LecturerView = () => {
    const { lecturers, loading, error, remove } = useLecturer();
    const [showDropdownFor, setShowDropdownFor] = useState<number | null>(null);

    const toggleDropdown = (id: number) => {
        setShowDropdownFor((prev) => (prev === id ? null : id));
    };

    const handleDelete = async (id: number) => {
        await remove(id);
        toast.success("Lecturer deleted successfully");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Lecturers</h2>
            {loading && <p>Loading Lecturers...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border rounded-md overflow-hidden">
                    <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-3 border">#</th>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Department</th>
                        <th className="p-3 border">College</th>
                        <th className="p-3 border text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lecturers.map((lec, index) => (
                        <tr key={lec.id} className="hover:bg-gray-50">
                            <td className="p-3 border">{index + 1}</td>
                            <td className="p-3 border">{lec.fullName}</td>
                            <td className="p-3 border">{lec.department.name}</td>
                            <td className="p-3 border">{lec.department.collegeName}</td>
                            <td className="p-3 border text-center relative">
                                <button
                                    onClick={() => toggleDropdown(lec.id)}
                                    className="p-1 hover:bg-gray-200 rounded-full"
                                >
                                    <MoreVertical size={18} />
                                </button>
                                {showDropdownFor === lec.id && (
                                    <div className="absolute right-2 top-8 bg-white border shadow-md z-10 rounded-md">
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                toast("Edit functionality coming soon");
                                                setShowDropdownFor(null);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                            onClick={() => {
                                                handleDelete(lec.id);
                                                setShowDropdownFor(null);
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

            <div className="mt-6">
                <Button
                    text="Add New Lecturer"
                    classname="bg-black text-white px-4 py-2 font-semibold"
                    onClick={() => toast("Create Lecturer Modal coming soon")}
                />
            </div>
        </div>
    );
};

export default LecturerView;