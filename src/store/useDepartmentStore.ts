import { create } from "zustand"
import {DepartmentResponseDto} from "../types/department.ts";

interface DepartmentState {
    departments: DepartmentResponseDto[]
    setDepartments: (departments: DepartmentResponseDto[]) => void

    loading: boolean;
    setLoading: (loading: boolean) => void;

    error: string | null;
    setError: (error: string | null) => void
}

export const useDepartmentStore = create<DepartmentState>(
    (set) => (
        {
            departments: [],
            setDepartments: (departments: DepartmentResponseDto[]) => set({departments}),

            loading: false,
            setLoading: (loading: boolean) => set({loading}),

            error: null,
            setError: (error: string | null) => set({error})
        }
    )
)