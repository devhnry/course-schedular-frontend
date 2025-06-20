export interface CollegeBuildingRequestDto {
    name: string;
    code: string;
    collegeCode: string;
}

export interface CollegeBuildingResponseDto {
    id: number;
    name: string;
    code: string;
    college: {
        name: string;
        code: string;
    };
}
