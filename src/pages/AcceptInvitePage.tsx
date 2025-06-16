import Navbar from "../components/shared/Navbar.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Check, Shield, User, X} from "lucide-react"
import {AcceptInvitationInput} from "../schemas/invitationSchema.ts";
import toast from "react-hot-toast";
import {useInvitation} from "../hooks/useInvitation.ts";
import Button from "../components/shared/Button.tsx";
import {useEffect, useState} from "react";
import {InvitationResponseData} from "../types/invitation.ts";

const AcceptInvitePage = () => {
    const [searchParams] = useSearchParams();
    const { loading, acceptInvite, getInvite } = useInvitation()
    const [departmentName, setDepartmentName] = useState("")
    const [ inviteDetails, setInviteDetails ] = useState<InvitationResponseData | null>(null)
    const navigate = useNavigate()

    const token = searchParams.get('token') as string;
    const email = searchParams.get('email') as string;
    const paramData = { token, hodEmail: email }

    useEffect(() => {
        const verifyInvite = async () => {
            if (!token || !email) {
                toast.error("Missing invitation details");
                return;
            }
            const result = await getInvite({ token });
            if (result.status === "failed") {
                toast.error("Invalid or expired invitation link.");
                return;
            }

            if (result.status === "success" && result.inviteData) {
                setInviteDetails(result.inviteData);
                setDepartmentName(result.inviteData.departmentName);
            } else {
                toast.error("Could not load invite details");
            }
        };

        verifyInvite().catch(console.error);
    }, [token, email]);

    const onAcceptInvite = async (data: AcceptInvitationInput) => {
        if(data.token != null && data.hodEmail != null){
            data.token = token;
            data.hodEmail = email;
        } else{
            toast.error("Invalid Invite Link");
        }
        const result = await acceptInvite(data);
        if(result === "success"){
            navigate("/onboarding");
        }
    };

    const permissions = [
        "View all department courses and programs.",
        "Assign lecturers to department courses.",
        "Edit course-lecturer assignments before timetable generation.",
    ]

    return (
        <div>
            <Navbar loginButton={false} />
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-20">
                {/* Black Header */}
                <div className="bg-black px-4 py-3">
                    <h1 className="text-white text-xl font-bold mb-2">You've been invited to join</h1>
                    <p className="text-gray-300 text-md">Covenant University TimeTablePro</p>
                </div>

                {/* Main Content */}
                <div className="px-8 py-8">
                    {/* Invitation Message */}
                    <div className="flex items-start gap-4 mb-8">
                        <div className="flex-shrink-0">
                            <User className="h-8 w-8 text-black" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">DAPU has invited you to collaborate</h2>
                            {inviteDetails ? (
                                <p>You've been invited to join as the <strong>HOD</strong> of <span className={`font-bold`}>{departmentName}</span> department.</p>
                            ) : (
                                <p className="text-gray-400 text-sm">Loading invitation...</p>
                            )}
                        </div>
                    </div>

                    {/* Role Section */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="h-6 w-6 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Role: HOD</h3>
                        </div>

                        <p className="text-gray-700 mb-3">As a HOD, you will have the following permissions:</p>

                        <div className="space-y-2">
                            {permissions.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                            {/* Restricted Permission */}
                            <div className="flex items-center gap-3">
                                <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                <span className="text-gray-400">Cannot generate or regenerate timetables manually.</span>
                            </div>
                        </div>
                    </div>

                    {/* Accept Button */}
                    <div className="mt-5">
                        <Button onClick={() => onAcceptInvite(paramData)}
                                text={!loading ? 'Accept Invitation' : 'Validating invite...'}
                                classname={`px-4 py-3 w-full font-medium text-[16.5px] ${loading ? 'bg-black/60' : 'bg-black'} text-white`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcceptInvitePage;