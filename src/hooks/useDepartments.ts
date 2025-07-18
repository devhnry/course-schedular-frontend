import {useEffect} from "react";
import {
    createDepartment,
    deleteDepartment,
    getDepartmentById,
    getDepartments,
    updateDepartment
} from "../api/clients/departmentClient.ts";
import {DepartmentRequestDto} from "../types/department.ts";
import {AxiosError} from "axios";
import {useDepartmentStore} from "../store/useDepartmentStore.ts";

export const useDepartments = () => {
    const { departments, setDepartments, loading, setLoading, error, setError } = useDepartmentStore();

    const fetchAll = async () => {
        setLoading(true);
        try {
            const result = await getDepartments();
            setDepartments(result);
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error?.response?.data?.statusMessage || "Failed to load departments");
        } finally {
            setLoading(false);
        }
    };

    const fetchById = async (id: number) => {
        return await getDepartmentById(id);
    };

    const create = async (dto: DepartmentRequestDto) => {
        const newDept = await createDepartment(dto);
        await fetchAll();
        return newDept;
    };

    const update = async (id: number, dto: DepartmentRequestDto) => {
        const updated = await updateDepartment(id, dto);
        await fetchAll();
        return updated;
    };

    const remove = async (id: number) => {
        await deleteDepartment(id);
        await fetchAll();
    };

    useEffect(() => {
        fetchAll()
            .finally(() => setLoading(false));
    }, []);

    return { departments,  loading,  error,  refetch: fetchAll,  fetchById,  create,  update,  remove };
};
