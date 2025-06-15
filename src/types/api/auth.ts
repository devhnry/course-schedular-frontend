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
    statusCode: 1;
    statusMessage: string;
    data: {
        accessToken: string;
        refreshToken: string;
        tokenExpirationDuration: string;
        userId: string;
        fullName: string;
        email: string;
        role: string;
    };
}

export interface ErrorLoginResponse {
    statusCode: 42 | 99;
    statusMessage: string;
    data?: null;
}

export enum AuthStatusCode {
    Success = 1,
    RequireOTP = 13,
    UserNotFound = 99,
    InvalidPassword = 42,
}

export type LoginResponse = OtpResponse | SuccessLoginResponse | ErrorLoginResponse;
