import {z} from "zod";

export const invitationSchema = z.object({
    email: z.string().email("Invalid email address"),
    departmentCode: z.string()
});

export const acceptInvitationSchema = z.object({
    token: z.string(),
    hodEmail: z.string().email("Invalid email address"),
});

export const getInvitationSchema = z.object({
    token: z.string(),
});


export type InvitationInput = z.infer<typeof invitationSchema>;
export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>;
export type getInvitationInput = z.infer<typeof getInvitationSchema>;