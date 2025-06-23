import apiClient from "./apiClient";
import type {Lecturer, LecturerRequestDto} from "../../types/lecturer";
import type {DefaultApiResponse} from "../../types/api";

export const lecturerClient = {
    list: async (): Promise<Lecturer[]> => {
        const res = await apiClient.get<DefaultApiResponse<Lecturer[]>>("/lecturers");
        return res.data.data;
    },

    getById: async (id: number): Promise<Lecturer> => {
        const res = await apiClient.get<DefaultApiResponse<Lecturer>>(`/lecturers/${id}`);
        return res.data.data;
    },

    create: async (dto: LecturerRequestDto): Promise<Lecturer> => {
        const res = await apiClient.post<DefaultApiResponse<Lecturer>>("/lecturers", dto);
        return res.data.data;
    },

    update: async (id: number, dto: LecturerRequestDto): Promise<Lecturer> => {
        const res = await apiClient.put<DefaultApiResponse<Lecturer>>(`/lecturers/${id}`, dto);
        return res.data.data;
    },

    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/lecturers/${id}`);
    }
};
