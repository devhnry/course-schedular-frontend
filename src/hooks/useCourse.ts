import {useEffect, useState} from "react";
import {CourseRequestDto, CourseResponseDto} from "../types/course";
import {courseClient} from "../api/clients/courseClient";
import {AxiosError} from "axios";

export const useCourses = () => {
    const [courses, setCourses] = useState<CourseResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const result = await courseClient.list();
            setCourses(result);
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error?.response?.data?.statusMessage || "Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    const fetchById = async (id: number) => {
        return await courseClient.getById(id);
    };

    const create = async (dto: CourseRequestDto) => {
        const newCourse = await courseClient.create(dto);
        await fetchAll();
        return newCourse;
    };

    const update = async (id: number, dto: Partial<CourseRequestDto>) => {
        const updated = await courseClient.update(id, dto);
        await fetchAll();
        return updated;
    };

    const remove = async (id: number) => {
        await courseClient.remove(id);
        await fetchAll();
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return { courses, loading, error, refetch: fetchAll, fetchById, create, update, remove };
};
