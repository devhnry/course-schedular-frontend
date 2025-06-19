import {useEffect, useState} from "react";
import type {Lecturer, LecturerRequestDto} from "../types/lecturer";
import {lecturerClient} from "../api/clients/lecturerClient";
import {AxiosError} from "axios";

export const useLecturer = () => {
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const result = await lecturerClient.list();
            setLecturers(result);
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error?.response?.data?.statusMessage || "Failed to load lecturers");
        } finally {
            setLoading(false);
        }
    };

    const fetchById = async (id: number) => {
        return await lecturerClient.getById(id);
    };

    const create = async (dto: LecturerRequestDto) => {
        const newLec = await lecturerClient.create(dto);
        await fetchAll();
        return newLec;
    };

    const update = async (id: number, dto: LecturerRequestDto) => {
        const updated = await lecturerClient.update(id, dto);
        await fetchAll();
        return updated;
    };

    const remove = async (id: number) => {
        await lecturerClient.remove(id);
        await fetchAll();
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return { lecturers, loading, error, refetch: fetchAll, fetchById, create, update, remove };
};
