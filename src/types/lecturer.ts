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

export interface LecturerResponseDto {
    id: number;
    fullName: string;
    departmentCode: string;
    departmentName: string;
    collegeName: string;
}
