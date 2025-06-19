import {useState} from "react";
import toast from "react-hot-toast";
import {InvitationInput, invitationSchema} from "../schemas/invitationSchema.ts";
import {acceptInviteApi, getInviteApi, sendInviteApi} from "../api/invitation.ts";
import {
    GetInvitationResponse,
    InvitationResponse,
    InvitationResponseData,
    InvitationStatusCode
} from "../types/invitation.ts";
import {AxiosError} from "axios";
import {useAuthStore} from "../store/useAuthStore.ts";

export function useInvitation(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setInvitedDepartment } = useAuthStore()

    const sendInvite = async (data: InvitationInput): Promise<'success' | 'failure' | null> => {
        const parsed = invitationSchema.safeParse(data);
        if(!parsed.success){
            const firstIssue = parsed.error.issues[0]
            toast.error(firstIssue.message, {
                duration: 2500
            });
            return null;
        }

        try{
            setLoading(true);
            const response = await sendInviteApi(data);
            const res: InvitationResponse = response.data;

            switch (res.statusCode) {
                case InvitationStatusCode.InviteSentSuccess:
                    toast("Invite sent to HOD", { icon: "📨" });
                    return "success";
                case InvitationStatusCode.Failed:
                    setError(res.statusMessage);
                    console.error(res.statusMessage);
                    toast.error(res.statusMessage || "Invite failed");
                    return "failure";
                default:
                    setError("Unexpected response from server");
                    return null;
            }

        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Invite verification failed");
            return null;
        } finally {
            setLoading(false);
        }
    }

    const acceptInvite = async (params: { token: string, hodEmail: string}): Promise<'success' | 'failure' | null> => {
        try{
            setLoading(true);
            const response = await acceptInviteApi(params);
            const res: InvitationResponse = response.data;

            switch (res.statusCode) {
                case InvitationStatusCode.AcceptInviteSuccess:
                    setInvitedDepartment(res.data?.departmentCode)
                    toast("Invitation Verified", { icon: "📨" });
                    return "success";
                case InvitationStatusCode.Failed:
                    setError(res.statusMessage);
                    console.error(res.statusMessage);
                    toast.error(res.statusMessage || "Invite failed");
                    return "failure";
                default:
                    setError("Unexpected response from server");
                    return null;
            }

        }catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Invite verification failed");
            return null;
        } finally {
            setLoading(false);
        }
    }

    const getInvite = async (params: { token: string }): Promise<
        { status: "success" | "failed" | null, inviteData?: InvitationResponseData }> => {
        try{
            setLoading(true);
            const response = await getInviteApi(params);
            const res: GetInvitationResponse = response.data;

            if (res.statusCode === InvitationStatusCode.AcceptInviteSuccess && res.data) {
                return { status: "success", inviteData: res.data };
            }

            switch (res.statusCode) {
                case InvitationStatusCode.InviteNotFound:
                    return { status: "failed"};
                default:
                    setError("Unexpected response from server");
                    return { status: null };
            }
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Invite verification failed");
            return { status: null };
        } finally {
            setLoading(false);
        }
    }

    return { sendInvite, acceptInvite, getInvite, loading, error };
}