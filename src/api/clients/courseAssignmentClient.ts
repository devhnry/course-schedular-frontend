import {CourseAssignmentRequestDto, CourseAssignmentResponseDto} from "../../types/courseAssignment.ts";
import apiClient from "./apiClient.ts";

export const courseAssignmentClient = {
    listAll: async (): Promise<CourseAssignmentResponseDto[]> => {
        const res = await apiClient.get<{ data: CourseAssignmentResponseDto[] }>("/course-assignments/all");
        return res.data.data;
    },

    getByDepartment: async (departmentId: number): Promise<CourseAssignmentResponseDto[]> => {
        const res = await apiClient.get<{ data: CourseAssignmentResponseDto[] }>(`/course-assignments/by-department/${departmentId}`);
        return res.data.data;
    },

    getByLecturer: async (lecturerId: number): Promise<CourseAssignmentResponseDto[]> => {
        const res = await apiClient.get<{ data: CourseAssignmentResponseDto[] }>(`/course-assignments/by-lecturer/${lecturerId}`);
        return res.data.data;
    },

    create: async (dto: CourseAssignmentRequestDto): Promise<CourseAssignmentResponseDto> => {
        const res = await apiClient.post<{ data: CourseAssignmentResponseDto }>("/course-assignments", dto);
        return res.data.data;
    },

    update: async (id: number, dto: CourseAssignmentRequestDto): Promise<CourseAssignmentResponseDto> => {
        const res = await apiClient.put<{ data: CourseAssignmentResponseDto }>(`/course-assignments/${id}`, dto);
        return res.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/course-assignments/${id}`);
    },
};