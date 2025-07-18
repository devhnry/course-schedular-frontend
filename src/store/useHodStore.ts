import { create } from "zustand"
import type { HodManagementDto, PageResponse } from "../types/hod"

interface HodState {
    page: number;
    setPage: (page: number) => void;

    size: number;
    setSize: (size: number) => void;

    data: PageResponse<HodManagementDto> | null
    setData: (
        data: PageResponse<HodManagementDto> | ((prev: PageResponse<HodManagementDto> | null) => PageResponse<HodManagementDto>)
    ) => void

    loading: boolean
    setLoading: (loading: boolean) => void

    error: string | null
    setError: (error: string | null) => void
}


export const useHodStore = create<HodState>(
    (set) => ({
        page: 0,
        setPage: (page) => set({ page }),

        size: 10,
        setSize: (size) => set({ size }),

        data: null,
        setData: (data) =>
            set((state) => ({
                data: typeof data === "function" ? data(state.data) : data,
            })),

        loading: false,
        setLoading: (loading) => set({ loading }),

        error: null,
        setError: (error) => set({ error }),
    }));