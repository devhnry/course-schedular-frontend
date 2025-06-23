import {useState} from "react";
import {MoreVertical} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../shared/Button.tsx";
import {usePrograms} from "../../../hooks/useProgram.ts";

const ProgramView = () => {
    const { programs, loading, error, remove } = usePrograms();
    const [showDropdownFor, setShowDropdownFor] = useState<number | null>(null);

    const toggleDropdown = (id: number) => {
        setShowDropdownFor(prev => (prev === id ? null : id));
    };

    const handleDelete = async (id: number) => {
        await remove(id);
        toast.success("Program deleted");
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Programs</h2>
                <Button
                    text="Add New Program"
                    classname="bg-black text-white px-4 py-2 rounded-md"
                    onClick={() => toast("Open Create Program Modal (coming soon)", { icon: "➕" })}
                />
            </div>

            {loading && <p className="text-gray-500">Loading programs...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="overflow-x-auto border rounded-md">
                <table className="min-w-full bg-white text-sm text-left">
                    <thead className="bg-gray-50">
                    <tr className="text-gray-700 font-semibold">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Department</th>
                        <th className="px-4 py-3">College</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {programs.map((p, idx) => (
                        <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                            <td className="px-4 py-3">{idx + 1}</td>
                            <td className="px-4 py-3">{p.name}</td>
                            <td className="px-4 py-3">{p.departmentName}</td>
                            <td className="px-4 py-3">{p.collegeName}</td>
                            <td className="px-4 py-3 text-center relative">
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                    onClick={() => toggleDropdown(p.id)}
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {showDropdownFor === p.id && (
                                    <div className="absolute right-4 top-8 w-36 bg-white border shadow-md z-10 rounded-md">
                                        <button
                                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                            onClick={() => {
                                                toast("Edit Program (coming soon)", { icon: "✏️" });
                                                setShowDropdownFor(null);
                                            }}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                                            onClick={() => {
                                                handleDelete(p.id);
                                                setShowDropdownFor(null);
                                            }}
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    {programs.length === 0 && !loading && (
                        <tr>
                            <td colSpan={5} className="p-6 text-center text-gray-500 italic">
                                No programs found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgramView;
