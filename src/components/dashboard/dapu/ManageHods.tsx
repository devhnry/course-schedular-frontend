import InviteHodForm from "./InviteHodForm.tsx";
import ManageHodTable from "./ManageHodTable.tsx";

const ManageHods = () => {
    return (
        <section className="overflow-y-auto pr-2 h-full">
            <section className={`my-4 p-8 py-4 border-[0.7px] rounded-lg h-fit border-black/20`}>
                <div className={`pb-6`}>
                    <h1 className={`text-[26px] font-bold`}>Invite New HOD</h1>
                    <p className={`font-body text-[14px]`}>Send an invitation to a new Head of Department</p>
                </div>
                <InviteHodForm />
            </section>

            <section className={`my-4 p-8 py-4 border-[0.7px] rounded-lg h-fit border-black/20`}>
                <div className={`pb-6`}>
                    <h1 className={`text-[26px] font-bold`}>Manage HODs</h1>
                    <p className={`font-body text-[14px]`}>Manage head of department access and permissions</p>
                </div>
                <ManageHodTable />
            </section>

        </section>
    );
};

export default ManageHods;