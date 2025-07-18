import TextInput from "../../shared/TextInput.tsx"
import Button from "../../shared/Button.tsx"
import { useForm } from "react-hook-form"
import type { InvitationInput } from "../../../schemas/invitationSchema.ts"
import { useInvitation } from "../../../hooks/useInvitation.ts"
import { useDepartments } from "../../../hooks/useDepartments.ts"
import DepartmentDropdown from "./DepartmentDropdown.tsx"
import { useState } from "react"
import type { DepartmentResponseDto } from "../../../types/department.ts"
import toast from "react-hot-toast"
import {useHods} from "../../../hooks/useHods.ts";
// import { useHods } from "../../../hooks/useHods.ts"
// import {useHodStore} from "../../../store/useHodStore.ts";

interface InviteHodFormProps {
    onSuccess?: () => void
}

const InviteHodForm = ({ onSuccess }: InviteHodFormProps) => {
    const { departments } = useDepartments()
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<InvitationInput>({ mode: "onChange" })
    const { loading, sendInvite } = useInvitation()
    const { refresh } = useHods()
    const [selectedDept, setSelectedDept] = useState<DepartmentResponseDto | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: InvitationInput) => {
        console.log("Form selectedDept:", selectedDept)
        if (!selectedDept) {
            toast.error("Please select a department")
            return
        }

        setIsSubmitting(true)

        try {
            data.departmentCode = selectedDept.code
            await sendInvite(data)

            // Refresh the HOD list to show the new invitation
            // await fetch(0)
            await refresh()

            // Reset form
            reset()
            setSelectedDept(null)

            toast.success("HOD invitation sent successfully!")

            // Call success callback to close modal
            if (onSuccess) {
                onSuccess()
            }
        } catch (error) {
            console.error("Failed to send invitation:", error)
            toast.error("Failed to send invitation. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const isFormLoading = loading || isSubmitting

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-4">
            <TextInput
                label="Email Address"
                name="email"
                placeholder="hod@covenantuniversity.edu.ng"
                register={register}
                disabled={isFormLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

            <div>
                <label className="text-sm mb-1 block">Select Department</label>
                <DepartmentDropdown
                    departments={departments}
                    selected={selectedDept}
                    onSelect={(dept) => {
                        setSelectedDept(dept)
                        setValue("departmentCode", String(dept.id))
                    }}
                    disabled={isFormLoading}
                />
            </div>

            <Button
                type="submit"
                disabled={isFormLoading}
                text={isFormLoading ? "Sending..." : "Send Invitation"}
                classname={`w-fit bg-black text-white p-2.5 text-[16px] mb-3 
                ${isFormLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-black/90"}`}
            />
        </form>
    )
}

export default InviteHodForm
