import {useState} from "react";
import {MoreVertical} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../shared/Button.tsx";
import {useVenues} from "../../../hooks/useVenue.ts";

const ManageVenue = () => {
    const { venues, loading, error, remove } = useVenues();

    const [showDropdownFor, setShowDropdownFor] = useState<number | null>(null);

    const toggleDropdown = (id: number) => {
        setShowDropdownFor(prev => (prev === id ? null : id));
    };

    const handleDelete = async (id: number) => {
        await remove(id);
        toast.success("Venue deleted");
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Venues</h2>
                <Button
                    text="Add New Venue"
                    classname="bg-black text-white px-4 py-2 rounded-md"
                    onClick={() => toast("Open Create Venue Modal (coming soon)", { icon: "➕" })}
                />
            </div>

            {loading && <p className="text-gray-500">Loading venues...</p>}
            {error && <p className="text-red-500 border-red-300 p-4 border rounded-md bg-red-300/10 font-bold mb-4">{error}</p>}

            <div className="overflow-x-auto border rounded-md">
                <table className="min-w-full bg-white text-sm text-left">
                    <thead className="bg-gray-50">
                    <tr className="text-gray-700 font-semibold">
                        <th className="px-4 py-3">S/N</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Capacity</th>
                        <th className="px-4 py-3">College Building</th>
                        <th className="px-4 py-3">Available?</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {venues.map((venue, idx) => (
                        <tr key={venue.id} className="border-t hover:bg-gray-50 transition">
                            <td className="px-4 py-3">{idx + 1}</td>
                            <td className="px-4 py-3">{venue.name}</td>
                            <td className="px-4 py-3">{venue.capacity}</td>
                            <td className="px-4 py-3">{venue.collegeBuildingName}</td>
                            <td className="px-4 py-3">{venue.available ? "Yes" : "No"}</td>
                            <td className="px-4 py-3 text-center relative">
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                    onClick={() => toggleDropdown(venue.id)}
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {showDropdownFor === venue.id && (
                                    <div className="absolute right-4 top-8 w-36 bg-white border shadow-md z-10 rounded-md">
                                        <button
                                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                            onClick={() => {
                                                toast("Edit Venue (coming soon)", { icon: "🛠️" });
                                                setShowDropdownFor(null);
                                            }}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                                            onClick={() => {
                                                handleDelete(venue.id);
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
                    {venues.length === 0 && !loading && (
                        <tr>
                            <td colSpan={6} className="p-6 text-center text-gray-500 italic">
                                No venues found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageVenue;
