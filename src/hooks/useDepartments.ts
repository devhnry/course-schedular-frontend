import {useEffect, useState} from "react";
import {
    createDepartment,
    deleteDepartment,
    getDepartmentById,
    getDepartments,
    updateDepartment,
} from "../services/departmentClient.ts";
import {Department, DepartmentDto} from "../types/department.ts";

export const useDepartments = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const result = await getDepartments();
            setDepartments(result);
        } catch (err) {
            setError("Failed to load departments");
        } finally {
            setLoading(false);
        }
    };

    const fetchById = async (id: number) => {
        return await getDepartmentById(id);
    };

    const create = async (dto: DepartmentDto) => {
        const newDept = await createDepartment(dto);
        await fetchAll();
        return newDept;
    };

    const update = async (id: number, dto: DepartmentDto) => {
        const updated = await updateDepartment(id, dto);
        await fetchAll();
        return updated;
    };

    const remove = async (id: number) => {
        await deleteDepartment(id);
        await fetchAll();
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return {
        departments,
        loading,
        error,
        refetch: fetchAll,
        fetchById,
        create,
        update,
        remove,
    };
};
