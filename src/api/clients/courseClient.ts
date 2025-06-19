import apiClient from "./apiClient";
import type {CourseRequestDto, CourseResponseDto} from "../../types/course";
import type {DefaultApiResponse} from "../../types/api";

export const courseClient = {
    list: async (): Promise<CourseResponseDto[]> => {
        const res = await apiClient.get<DefaultApiResponse<CourseResponseDto[]>>("/courses");
        return res.data.data;
    },

    getById: async (id: number): Promise<CourseResponseDto> => {
        const res = await apiClient.get<DefaultApiResponse<CourseResponseDto>>(`/courses/${id}`);
        return res.data.data;
    },

    create: async (dto: CourseRequestDto): Promise<CourseResponseDto> => {
        const res = await apiClient.post<DefaultApiResponse<CourseResponseDto>>("/courses", dto);
        return res.data.data;
    },

    update: async (id: number, dto: Partial<CourseRequestDto>): Promise<CourseResponseDto> => {
        const res = await apiClient.put<DefaultApiResponse<CourseResponseDto>>(`/courses/${id}`, dto);
        return res.data.data;
    },

    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/courses/${id}`);
    }
};
