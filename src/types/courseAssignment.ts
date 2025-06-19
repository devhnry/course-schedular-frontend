// types/courseAssignment.ts

export interface CourseAssignmentRequestDto {
    courseCode: string;
    lecturerNames: string[]; // List of lecturer full names
    overrideBuildingCode?: string | null;
}

export interface CourseAssignmentResponseDto {
    id: number;
    courseCode: string;
    courseTitle: string;
    programName: string;
    departmentCode: string;
    collegeCode: string;
    lecturerNames: string[];
    buildingCode: string;
}
