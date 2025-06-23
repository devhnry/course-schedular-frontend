import apiClient from "./apiClient.ts";
import {ProgramRequestDto, ProgramResponseDto} from "../../types/program.ts";
import {DefaultApiResponse} from "../../types/api.ts";

export const getPrograms = async (): Promise<ProgramResponseDto[]> => {
    const res = await apiClient.get<DefaultApiResponse<ProgramResponseDto[]>>("/programs");
    return res.data.data;
};

export const getProgramById = async (id: number): Promise<ProgramResponseDto> => {
    const res = await apiClient.get<DefaultApiResponse<ProgramResponseDto>>(`/programs/${id}`);
    return res.data.data;
};

export const createProgram = async (dto: ProgramRequestDto): Promise<ProgramResponseDto> => {
    const res = await apiClient.post<DefaultApiResponse<ProgramResponseDto>>("/programs", dto);
    return res.data.data;
};

export const updateProgram = async (id: number, dto: ProgramRequestDto): Promise<ProgramResponseDto> => {
    const res = await apiClient.put<DefaultApiResponse<ProgramResponseDto>>(`/programs/${id}`, dto);
    return res.data.data;
};

export const deleteProgram = async (id: number): Promise<void> => {
    await apiClient.delete<DefaultApiResponse<null>>(`/programs/${id}`);
};
