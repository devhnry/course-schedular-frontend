import { useEffect } from "react"
import { hodClient } from "../api/clients/hodClient.ts"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"
import {useHodStore} from "../store/useHodStore.ts";
import {HodManagementDto, PageResponse} from "../types/hod.ts";

export const useHods = () => {
    const { page, size, data, loading, error, setLoading, setError, setData, setPage } = useHodStore()

    useEffect(() => {
        fetchPage(page)
    }, [page])

    const fetchPage = async (p: number) => {
        setLoading(true)
        setError(null)

        try {
            const allData = await hodClient.list()
            const start = p * size
            const content = allData.slice(start, start + size)

            setData({
                content,
                totalElements: allData.length,
                totalPages: Math.ceil(allData.length / size),
                size,
                number: p,
            })
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>
            const errorMessage = error.response?.data?.statusMessage || "Failed to fetch HODs"
            setError(errorMessage)
            console.error("Failed to fetch HODs:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateAccess = async (userId: string, write: boolean) => {
        try {
            const updated = await hodClient.updateAccess(userId, write)

            // Update in-place if loaded
            setData((prevData) => {
                const fallback: PageResponse<HodManagementDto> = {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: 10,
                }

                const current = prevData ?? fallback

                return {
                    ...current,
                    content: current.content.map((hod) =>
                        hod.userId === userId ? updated : hod
                    ),
                }
            })


            toast.success(`HOD access ${write ? "granted" : "revoked"} successfully`)
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>
            const errorMessage = error.response?.data?.statusMessage || "Failed to update access"
            setError(errorMessage)
            toast.error(errorMessage)
            console.error("Failed to update HOD access:", error)
        }
    }

    const deleteHod = async (userId: string | null) => {
        if (!userId) {
            const errorMessage = "Cannot delete a HOD that hasn't signed up yet."
            setError(errorMessage)
            toast.error(errorMessage)
            return
        }

        try {
            await hodClient.delete(userId)

            // Remove from local state
            setData((prevData) => {
                const fallback: PageResponse<HodManagementDto> = {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: size, // use current size from store
                }

                const current = prevData ?? fallback
                const newContent = current.content.filter(hod => hod.userId !== userId)
                const newTotalElements = current.totalElements - 1
                const newTotalPages = Math.ceil(newTotalElements / current.size)

                return {
                    ...current,
                    content: newContent,
                    totalElements: newTotalElements,
                    totalPages: newTotalPages,
                }
            })

            toast.success("HOD deleted successfully")
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>
            const errorMessage = error.response?.data?.statusMessage || "Failed to delete HOD"
            setError(errorMessage)
            toast.error(errorMessage)
            console.error("Failed to delete HOD:", error)
        }
    }

    const refresh = async () => {
        await fetchPage(0)
    }

    return {
        data,
        loading,
        error,
        page,
        setPage,
        updateAccess,
        deleteHod,
        refresh,
    }
}
