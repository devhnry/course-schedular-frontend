// src/api/hodClient.ts
import apiClient from "./apiClient.ts";
import {HodManagementDto} from "../../types/hod.ts";

const BASE = "/hods";  // matches your controller’s @RequestMapping("/api/v1/hods")

export const hodClient = {
    list: async (): Promise<HodManagementDto[]> => {
        const res = await apiClient.get<{ data: HodManagementDto[] }>(BASE);
        return res.data.data;
    },

    updateAccess: async (
        userId: string,
        write: boolean
    ): Promise<HodManagementDto> => {
        const res = await apiClient.put<{ data: HodManagementDto }>(
            `${BASE}/${userId}/access?write=${write}`
        );
        return res.data.data;
    },

    delete: async (userId: string): Promise<void> => {
        await apiClient.delete(`${BASE}/${userId}`);
    },
};
