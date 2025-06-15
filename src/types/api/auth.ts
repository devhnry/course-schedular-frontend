export interface OtpResponse {
    statusCode: 13;
    statusMessage: string;
    data: {
        email: string;
        loginVerified: false;
        oneTimePassword: {
            otpCode: string;
            expired: boolean;
            expirationDuration: string;
            user: {
                emailAddress: string;
                accountVerified: boolean;
            };
        };
    };
}

export interface SuccessLoginResponse {
    statusCode: 12;
    statusMessage: string;
    data: {
        fullName: string;
        role: string;
        email: string;
        loginVerified: boolean;
        accessToken: string;
        refreshToken: string;
        tokenExpirationDuration: string;
        oneTimePassword: string | null;
    };
}

export interface ErrorLoginResponse {
    statusCode: 42 | 99;
    statusMessage: string;
    data?: null;
}

export enum AuthStatusCode {
    Success = 12,
    RequireOTP = 13,
    UserNotFound = 99,
    InvalidPassword = 42,
    ExpiredOrInvalidOtp = 99
}

export type LoginResponse = OtpResponse | SuccessLoginResponse | ErrorLoginResponse;
