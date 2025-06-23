import apiClient from "./apiClient.ts";
import {DepartmentRequestDto, DepartmentResponseDto} from "../../types/department.ts";

export const getDepartments = async (): Promise<DepartmentResponseDto[]> => {
    const res = await apiClient.get("/departments");
    return res.data.data;
};

export const getDepartmentById = async (id: number): Promise<DepartmentResponseDto> => {
    const res = await apiClient.get(`/departments/${id}`);
    return res.data.data;
};

export const createDepartment = async (dto: DepartmentRequestDto): Promise<DepartmentResponseDto> => {
    const res = await apiClient.post("/departments", dto);
    return res.data.data;
};

export const updateDepartment = async (id: number, dto: DepartmentRequestDto): Promise<DepartmentResponseDto> => {
    const res = await apiClient.put(`/departments/${id}`, dto);
    return res.data.data;
};

export const deleteDepartment = async (id: number): Promise<void> => {
    await apiClient.delete(`/departments/${id}`);
};
