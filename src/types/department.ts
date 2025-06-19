export interface DepartmentRequestDto {
    name: string;
    code: string;
    collegeBuildingCode: string;
}

export interface DepartmentResponseDto {
    id: number;
    name: string;
    code: string;
    collegeBuildingCode: string;
    collegeBuildingName: string;
}