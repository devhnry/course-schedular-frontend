export interface HodManagementDto {
    userId: string | null;        // null if not yet onboarded
    emailAddress: string;
    firstName: string | null;
    lastName: string | null;
    departmentId: string;
    departmentName: string | null;
    accountVerified: boolean;
    writeAccess: boolean | null;  // null if not onboarded
    status: "PENDING"|"ACCEPTED"|"EXPIRED";
    invitedAt: string;            // ISO datetime
    expiresAt: string;            // ISO datetime
}

export interface PageResponse<T> {
    content: T[];
    /** total number of elements across all pages */
    totalElements: number;
    totalPages: number;
    number: number;     // current page (0‑based)
    size: number;       // page size
}
