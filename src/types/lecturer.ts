export interface Lecturer {
    id: number;
    fullName: string;
    department: {
        code: string;
        name: string;
        collegeName: string;
    };
}

export interface LecturerRequestDto {
    fullName: string;
}
