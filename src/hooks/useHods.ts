import {useEffect, useState} from "react";
import {hodClient} from "../api/clients/hodClient.ts";
import {HodManagementDto, PageResponse} from "../types/hod";
import {AxiosError} from "axios";

export const useHods = (initialPage = 0, initialSize = 10) => {
    const [page, setPage] = useState<number>(initialPage);
    const [size] = useState<number>(initialSize);
    const [data, setData] = useState<PageResponse<HodManagementDto> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => {
        fetchPage(page).then(r => console.info(r)).catch(e => console.error(e));
    }, [page]);

    const fetchPage = async (p: number) => {
        setLoading(true);
        try {
            const allData = await hodClient.list(); // ignore p, size
            const start = p * size;
            const content = allData.slice(start, start + size);
            setData({
                content,
                totalElements: allData.length,
                totalPages: Math.ceil(allData.length / size),
                size,
                number: p,
            });
            setError(null);
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Failed to update access");
        } finally {
            setLoading(false);
        }
    };

    const updateAccess = async (userId: string, write: boolean) => {
        setLoading(true);
        try {
            const updated = await hodClient.updateAccess(userId, write);
            // update in-place if loaded
            setData((d) => {
                if (!d) return d;
                return {
                    ...d,
                    content: d.content.map((h) =>
                        h.userId === userId ? updated : h
                    ),
                };
            });
        }  catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Failed to update access");
        } finally {
            setLoading(false);
        }
    };

    const deleteHod = async (userId: string | null) => {
        if (!userId) {
            setError("Cannot delete a HOD that hasn't signed up yet.");
            return;
        }

        setLoading(true);
        try {
            await hodClient.delete(userId);
            setData((d) => {
                if (!d) return d;
                return {
                    ...d,
                    content: d.content.filter((h) => h.userId !== userId),
                };
            });
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error.response?.data?.statusMessage || "Failed to delete HOD.");
        } finally {
            setLoading(false);
        }
    };

    return { data,  loading,  error,  page,  setPage,  updateAccess,  deleteHod,  refresh: () => fetchPage(page),
    };
};
