import {useEffect, useState} from "react";
import {
    createCollegeBuilding,
    deleteCollegeBuilding,
    getAllCollegeBuildings,
    getCollegeBuildingById,
    updateCollegeBuilding,
} from "../api/clients/collegeBuildingClient.ts";
import {AxiosError} from "axios";
import {CollegeBuildingRequestDto, CollegeBuildingResponseDto} from "../types/collegeBuilding.ts";

export const useCollegeBuildings = () => {
    const [buildings, setBuildings] = useState<CollegeBuildingResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = async () => {
        try {
            setLoading(true);
            const result = await getAllCollegeBuildings();
            setBuildings(result);
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error?.response?.data?.statusMessage || "Could not fetch buildings");
        } finally {
            setLoading(false);
        }
    };

    const fetchById = async (id: number) => {
        return await getCollegeBuildingById(id);
    };

    const create = async (dto: CollegeBuildingRequestDto) => {
        const result = await createCollegeBuilding(dto);
        await fetchAll();
        return result;
    };

    const update = async (id: number, dto: CollegeBuildingRequestDto) => {
        const result = await updateCollegeBuilding(id, dto);
        await fetchAll();
        return result;
    };

    const remove = async (id: number) => {
        await deleteCollegeBuilding(id);
        await fetchAll();
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return { buildings, loading, error, fetchAll, fetchById, create, update, remove };
};
