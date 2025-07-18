import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {X} from "lucide-react"
import {useVenues} from "../../../../hooks/useVenue"
import {useCollegeBuildings} from "../../../../hooks/useCollegeBuilding"
import Button from "../../../shared/Button"
import TextInput from "../../../shared/TextInput"
import toast from "react-hot-toast"
import type {VenueRequestDto, VenueResponseDto} from "../../../../types/venue"

interface EditVenueModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    venue: VenueResponseDto | null
}

const EditVenueModal = ({ isOpen, onClose, onSuccess, venue }: EditVenueModalProps) => {
    const [loading, setLoading] = useState(false)
    const { update, refetch } = useVenues()
    const { buildings } = useCollegeBuildings()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<VenueRequestDto>()

    useEffect(() => {
        if (venue && isOpen) {
            setValue("name", venue.name)
            setValue("capacity", venue.capacity)
            setValue("collegeBuildingCode", venue.collegeBuildingCode)
            setValue("available", venue.available)
        }
    }, [venue, isOpen, setValue])

    const onSubmit = async (data: VenueRequestDto) => {
        if (!venue) return

        try {
            setLoading(true)
            await update(venue.id, data)
            toast.success("Venue updated successfully!")
            reset()
            refetch().catch(e => console.error(e))
            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.response?.data?.statusMessage || "Failed to update venue")
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen || !venue) return null

    return (
        <div className="fixed inset-0 bottom-0 bg-black/50 flex items-center justify-center z-50 h-full">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Venue</h2>
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
                            <option value={``} >Select College Building</option>
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
                            text={loading ? "Updating..." : "Update Venue"}
                            classname={`flex-1 bg-black text-white py-2 px-4 rounded-md ${loading ? "opacity-50" : "hover:bg-gray-800"}`}
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditVenueModal
