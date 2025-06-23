import apiClient from "./apiClient";
import type {LecturerRequestDto, LecturerResponseDto} from "../../types/lecturer";
import type {DefaultApiResponse} from "../../types/api";

export const lecturerClient = {
    list: async (): Promise<LecturerResponseDto[]> => {
        const res = await apiClient.get<DefaultApiResponse<LecturerResponseDto[]>>("/lecturers");
        return res.data.data;
    },

    getById: async (id: number): Promise<LecturerResponseDto> => {
        const res = await apiClient.get<DefaultApiResponse<LecturerResponseDto>>(`/lecturers/${id}`);
        return res.data.data;
    },

    create: async (dto: LecturerRequestDto): Promise<LecturerResponseDto> => {
        const res = await apiClient.post<DefaultApiResponse<LecturerResponseDto>>("/lecturers", dto);
        return res.data.data;
    },

    update: async (id: number, dto: LecturerRequestDto): Promise<LecturerResponseDto> => {
        const res = await apiClient.put<DefaultApiResponse<LecturerResponseDto>>(`/lecturers/${id}`, dto);
        return res.data.data;
    },

    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/lecturers/${id}`);
    }
};
