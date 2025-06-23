import {useEffect, useState} from "react";
import {
    createProgram,
    deleteProgram,
    getProgramById,
    getPrograms,
    updateProgram
} from "../api/clients/programClient.ts";
import {ProgramRequestDto, ProgramResponseDto} from "../types/program.ts";
import {AxiosError} from "axios";

export const usePrograms = () => {
    const [programs, setPrograms] = useState<ProgramResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = async () => {
        try {
            setLoading(true);
            const res = await getPrograms();
            setPrograms(res);
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error?.response?.data?.statusMessage || "Failed to load programs");
        } finally {
            setLoading(false);
        }
    };

    const fetchById = async (id: number) => await getProgramById(id);

    const create = async (dto: ProgramRequestDto) => {
        const created = await createProgram(dto);
        await fetchAll();
        return created;
    };

    const update = async (id: number, dto: ProgramRequestDto) => {
        const updated = await updateProgram(id, dto);
        await fetchAll();
        return updated;
    };

    const remove = async (id: number) => {
        await deleteProgram(id);
        await fetchAll();
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return { programs, loading, error, fetchAll, fetchById, create, update, remove };
};
