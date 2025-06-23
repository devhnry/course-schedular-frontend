// useCourseAssignments.ts
import {useEffect, useState} from "react";
import {CourseAssignmentRequestDto, CourseAssignmentResponseDto} from "../types/courseAssignment";
import {courseAssignmentClient} from "../api/clients/courseAssignmentClient";
import {AxiosError} from "axios";

export const useCourseAssignments = () => {
    const [assignments, setAssignments] = useState<CourseAssignmentResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const res = await courseAssignmentClient.listAll();
            setAssignments(res);
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error?.response?.data?.statusMessage || "Failed to fetch assignments");
        } finally {
            setLoading(false);
        }
    };

    const getAssignmentsForDepartment = async (departmentId: number) => {
        setLoading(true);
        try{
            const res = await courseAssignmentClient.getByDepartment(departmentId);
            setAssignments(res);
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error?.response?.data?.statusMessage || "Failed to fetch assignments");
        } finally {
            setLoading(false);
        }

    }

    const create = async (dto: CourseAssignmentRequestDto) => {
        const newItem = await courseAssignmentClient.create(dto);
        await fetchAll();
        return newItem;
    };

    const update = async (id: number, dto: CourseAssignmentRequestDto) => {
        const updated = await courseAssignmentClient.update(id, dto);
        await fetchAll();
        return updated;
    };

    const remove = async (id: number) => {
        await courseAssignmentClient.delete(id);
        await fetchAll();
    };

    useEffect(() => {
        fetchAll();
        // getAssignmentsForDepartment()
    }, []);

    return {
        assignments,
        loading,
        error,
        fetchAll,
        getAssignmentsForDepartment,
        refetch: fetchAll,
        create,
        update,
        remove
    };
};
