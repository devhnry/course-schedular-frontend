import {VenueResponseDto} from "../types/venue.ts";
import { create } from "zustand"

interface VenueState {
    venues: VenueResponseDto[]
    setVenues: (venues: VenueResponseDto[]) => void

    loading: boolean;
    setLoading: (loading: boolean) => void;

    error: string | null;
    setError: (error: string | null) => void
}

export const useVenueStore = create<VenueState>(
    (set) => (
        {
            venues: [],
            setVenues: (venues: VenueResponseDto[]) => set({venues}),

            loading: false,
            setLoading: (loading: boolean) => set({loading}),

            error: null,
            setError: (error: string | null) => set({error})
        }
    )
)