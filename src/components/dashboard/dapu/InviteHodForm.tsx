import TextInput from "../../shared/TextInput.tsx";
import Button from "../../shared/Button.tsx";
import {useForm} from "react-hook-form";
import {InvitationInput} from "../../../schemas/invitationSchema.ts";
import {useInvitation} from "../../../hooks/useInvitation.ts";
import {useDepartments} from "../../../hooks/useDepartments.ts";
import DepartmentDropdown from "./DepartmentDropdown.tsx";
import {useState} from "react";
import {DepartmentResponseDto} from "../../../types/department.ts";
import toast from "react-hot-toast";
import {useHods} from "../../../hooks/useHods.ts";

const InviteHodForm = () => {
    const { departments } = useDepartments()
    const { register, handleSubmit, setValue, reset, formState : {errors} } = useForm<InvitationInput>({mode: "onChange"});
    const { loading, sendInvite } = useInvitation()
    const { refresh } = useHods(0, 10)
    const [selectedDept, setSelectedDept] = useState<DepartmentResponseDto | null>(null);

    const onSubmit = async (data: InvitationInput) => {
        if (!selectedDept) {
            toast("Please select a department");
            return;
        }
        data.departmentCode = selectedDept.code;
        await sendInvite(data);

        reset();
        await refresh()
        setSelectedDept(null);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-4">
            <TextInput
                label="Email Address"
                name="email"
                placeholder="hod@covenantuniveristy.edu.ng"
                register={register}
            />
            {errors && (<p>{errors.email?.message}</p>)}

            <div>
                <label className="text-sm mb-1 block">Select Department</label>
                <DepartmentDropdown
                    departments={departments}
                    selected={selectedDept}
                    onSelect={(dept) => {
                        setSelectedDept(dept);
                        setValue("departmentCode", String(dept.id)); // for form data completeness
                    }}
                />
            </div>

            <Button
                type={"submit"}
                disabled={loading}
                text={loading ? "Sending..." : "Send Invitation"}
                classname={`w-fit bg-black text-white p-2.5 text-[16px] mb-3 
                ${loading ? "opacity-50" : ""}`}
            />
        </form>
    );
};

export default InviteHodForm;
