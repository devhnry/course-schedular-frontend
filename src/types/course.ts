export interface CourseRequestDto {
    courseCode: string;
    courseName: string;
    credits: number;
    programName: string;
    expectedStudents: number | null;
}

export interface CourseResponseDto {
    id: number;
    courseCode: string;
    courseName: string;
    level: number;
    credits: number;
    programCode: string;
    programName: string;
    departmentName: string;
    collegeName: string;
    expectedStudents: number | null;
    isGeneralCourse: boolean;
    isSportsCourse: boolean;
}
