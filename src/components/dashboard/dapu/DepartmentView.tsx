import {useDepartments} from "../../../hooks/useDepartments.ts";
import {MoreVertical} from "lucide-react";
import {useState} from "react";
import Button from "../../shared/Button.tsx";
import toast from "react-hot-toast";

const DepartmentView = () => {
    const { departments, loading, error, remove } = useDepartments();
    const [showDropdownFor, setShowDropdownFor] = useState<number | null>(null);

    const toggleDropdown = (id: number) => {
        setShowDropdownFor(prev => (prev === id ? null : id));
    };

    const handleEdit = () => {
        toast("Edit Department coming soon...", { icon: "🛠️" });
    };

    const handleDelete = async (id: number) => {
        await remove(id);
        toast.success("Department deleted");
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Manage Departments</h2>
                <Button
                    text="Add New Department"
                    classname="bg-black hover:bg-gray-800 text-white px-5 py-2 text-sm font-semibold rounded-md"
                    onClick={() => toast("Show Create Modal (coming soon)", { icon: "➕" })}
                />
            </div>

            {loading && <p className="text-gray-500 p-4 bg-gray-100/30 rounded-md mb-4">Loading departments...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50 border-b">
                    <tr className="text-sm text-gray-700 font-semibold">
                        <th className="p-4 text-left">#</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Code</th>
                        <th className="p-4 text-left">College Building</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map((dept, index) => (
                        <tr
                            key={dept.id}
                            className="hover:bg-gray-50 transition-colors text-sm text-gray-800"
                        >
                            <td className="p-4">{index + 1}</td>
                            <td className="p-4">{dept.name}</td>
                            <td className="p-4">{dept.code}</td>
                            <td className="p-4">{dept.collegeBuildingName}</td>
                            <td className="p-4 text-center relative">
                                <button
                                    onClick={() => toggleDropdown(dept.id)}
                                    className="p-2 rounded-md hover:bg-gray-100 transition"
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {showDropdownFor === dept.id && (
                                    <div className="absolute right-4 top-10 w-36 bg-white border border-gray-200 rounded-md shadow-md z-10 animate-fade-in">
                                        <button
                                            onClick={() => {
                                                handleEdit();
                                                setShowDropdownFor(null);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDelete(dept.id);
                                                setShowDropdownFor(null);
                                            }}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    {departments.length === 0 && !loading && (
                        <tr>
                            <td colSpan={5} className="p-6 text-center text-gray-500 italic">
                                No departments found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentView;
