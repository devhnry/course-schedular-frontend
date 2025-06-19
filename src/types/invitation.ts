export interface SuccessInviteResponse {
    statusCode: 10;
    statusMessage: string;
    data: {
        email: string;
        inviteToken: string;
        departmentCode: string;
        inviteVerified: boolean;
        inviteDate: string;
        expirationDate: string;
    };
}

export interface SuccessAcceptInviteResponse {
    statusCode: 13;
    statusMessage: string;
    data: {
        email: string;
        inviteToken: string;
        departmentCode: string;
        inviteVerified: boolean;
        inviteDate: string;
        expirationDate: string;
    };
}

export interface InviteResponse {
    statusCode: 13;
    statusMessage: string;
    data: InvitationResponseData
}

export interface InvitationResponseData {
    invitationId: string;
    emailAddress: string;
    role: string;
    departmentName: string;
    departmentCode: string;
    token: string;
    expiryDate: string;
    expiredOrUsed: boolean;
}

export interface InviteResponseFailed {
    statusCode: 53;
    statusMessage: string;
}

export interface ErrorLoginResponse {
    statusCode: 42 | 99;
    statusMessage: string;
    data?: null;
}

export enum InvitationStatusCode {
    InviteSentSuccess = 10,
    AcceptInviteSuccess = 13,
    InviteNotFound = 53,
    Failed = 99
}

export type InvitationResponse = SuccessInviteResponse | ErrorLoginResponse | SuccessAcceptInviteResponse;
export type GetInvitationResponse = InviteResponse | InviteResponseFailed;