import apiClient from "../services/api/apiClient.ts";
import {InvitationInput} from "../schemas/invitationSchema.ts";
import {GetInvitationResponse} from "../types/invitation.ts";

export const sendInviteApi =
    (data: InvitationInput) => apiClient.post("/invite/send", data);

export const acceptInviteApi = (params: { token: string; hodEmail: string }) =>
    apiClient.post("/invite/accept", null, { params });

export const getInviteApi = (params: { token: string; }) =>
    apiClient.get<GetInvitationResponse>(`/invite/details`, { params });
