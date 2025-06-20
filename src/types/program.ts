export interface ProgramRequestDto {
    name: string;
    departmentCode: string;
}

export interface ProgramResponseDto {
    id: number;
    name: string;
    departmentCode: string;
    departmentName: string;
    collegeName: string;
}
