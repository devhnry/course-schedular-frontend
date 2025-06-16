import apiClient from "./apiClient.ts";
import {Department, DepartmentDto} from "../types/department.ts";

// GET: all departments
export const getDepartments = async (): Promise<Department[]> => {
    const res = await apiClient.get("/departments");
    return res.data.data; // data inside DefaultApiResponse
};

// GET: department by id
export const getDepartmentById = async (id: number): Promise<Department> => {
    const res = await apiClient.get(`/departments/${id}`);
    return res.data.data;
};

// POST: create department
export const createDepartment = async (dto: DepartmentDto): Promise<Department> => {
    const res = await apiClient.post("/departments", dto);
    return res.data.data;
};

// PUT: update department
export const updateDepartment = async (id: number, dto: DepartmentDto): Promise<Department> => {
    const res = await apiClient.put(`/departments/${id}`, dto);
    return res.data.data;
};

// DELETE: delete department
export const deleteDepartment = async (id: number): Promise<void> => {
    await apiClient.delete(`/departments/${id}`);
};
