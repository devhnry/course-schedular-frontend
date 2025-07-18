import {useEffect} from "react";
import {AxiosError} from "axios";
import {VenueRequestDto} from "../types/venue.ts";
import {createVenue, deleteVenue, getVenueById, getVenues, updateVenue} from "../api/clients/venue.ts";
import {useVenueStore} from "../store/useVenueStore.ts";

export const useVenues = () => {
    const { venues, setVenues, loading, setLoading, error, setError } = useVenueStore();

    const fetchAll = async () => {
        setLoading(true);
        try {
            const result = await getVenues();
            setVenues(result);
        } catch (err) {
            const error = err as AxiosError<{ statusMessage: string }>;
            setError(error?.response?.data?.statusMessage || "Failed to load departments");
        } finally {
            setLoading(false);
        }
    };

    const fetchById = async (id: number) => {
        return await getVenueById(id);
    };

    const create = async (dto: VenueRequestDto) => {
        const newDept = await createVenue(dto);
        await fetchAll();
        return newDept;
    };

    const update = async (id: number, dto: VenueRequestDto) => {
        const updated = await updateVenue(id, dto);
        await fetchAll();
        return updated;
    };

    const remove = async (id: number) => {
        await deleteVenue(id);
        await fetchAll();
    };

    useEffect(() => {
        fetchAll()
            .finally(() => setLoading(false));
    }, []);

    return { venues,  loading,  error,  refetch: fetchAll,  fetchById,  create,  update,  remove };
};
