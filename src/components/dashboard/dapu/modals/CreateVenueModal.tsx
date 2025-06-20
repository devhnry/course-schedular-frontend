import {useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {useVenues} from "../../../../hooks/useVenue"
import {useCollegeBuildings} from "../../../../hooks/useCollegeBuilding"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {VenueRequestDto} from "../../../../types/venue"

interface CreateVenueModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

const CreateVenueModal = ({ isOpen, onClose, onSuccess }: CreateVenueModalProps) => {
    const [loading, setLoading] = useState(false)
    const { create } = useVenues()
    const { buildings } = useCollegeBuildings()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VenueRequestDto>()

    const onSubmit = async (data: VenueRequestDto) => {
        try {
            setLoading(true)
            await create(data)
            toast.success("Venue created successfully!")
            reset()
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to create venue")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Venue</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <TextInput label="Venue Name" name="name" placeholder="e.g., Lecture Theatre 1" register={register} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <TextInput label="Capacity" name="capacity" type="number" placeholder="e.g., 150" register={register} />
                    {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}

                    <div>
                        <label className="text-sm mb-1 block">College Building</label>
                        <select
                            {...register("collegeBuildingCode", { required: "College Building is required" })}
                            className="w-full border p-3 border-black/20 outline-none rounded-md text-sm"
                        >
                            <option value="">Select College Building</option>
                            {buildings.map((building) => (
                                <option key={building.id} value={building.code}>
                                    {building.name} ({building.code})
                                </option>
                            ))}
                        </select>
                        {errors.collegeBuildingCode && <p className="text-red-500 text-sm">{errors.collegeBuildingCode.message}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register("available")}
                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            defaultChecked={true}
                        />
                        <label className="text-sm text-gray-700">Available for scheduling</label>
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
                            text={loading ? "Creating..." : "Create Venue"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateVenueModal
