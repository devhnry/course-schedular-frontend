import apiClient from "./apiClient.ts";
import {CollegeBuildingRequestDto, CollegeBuildingResponseDto,} from "../../types/collegeBuilding.ts";
import {DefaultApiResponse} from "../../types/api.ts";

// Get all buildings
export const getAllCollegeBuildings = async (): Promise<CollegeBuildingResponseDto[]> => {
    const res = await apiClient.get<DefaultApiResponse<CollegeBuildingResponseDto[]>>("/buildings");
    return res.data.data;
};

// Get building by ID
export const getCollegeBuildingById = async (id: number): Promise<CollegeBuildingResponseDto> => {
    const res = await apiClient.get<DefaultApiResponse<CollegeBuildingResponseDto>>(`/buildings/${id}`);
    return res.data.data;
};

// Create a new building
export const createCollegeBuilding = async (dto: CollegeBuildingRequestDto): Promise<CollegeBuildingResponseDto> => {
    const res = await apiClient.post<DefaultApiResponse<CollegeBuildingResponseDto>>("/buildings", dto);
    return res.data.data;
};

// Update an existing building
export const updateCollegeBuilding = async (id: number, dto: CollegeBuildingRequestDto): Promise<CollegeBuildingResponseDto> => {
    const res = await apiClient.put<DefaultApiResponse<CollegeBuildingResponseDto>>(`/buildings/${id}`, dto);
    return res.data.data;
};

// Delete a building
export const deleteCollegeBuilding = async (id: number): Promise<void> => {
    await apiClient.delete<DefaultApiResponse<null>>(`/buildings/${id}`);
};
