import apiClient from "./apiClient.ts";
import {VenueRequestDto, VenueResponseDto} from "../../types/venue.ts";

export const getVenues = async (): Promise<VenueResponseDto[]> => {
    const res = await apiClient.get("/venues");
    return res.data.data;
};

export const getVenueById = async (id: number): Promise<VenueResponseDto> => {
    const res = await apiClient.get(`/venues/${id}`);
    return res.data.data;
};

export const createVenue = async (dto: VenueRequestDto): Promise<VenueResponseDto> => {
    const res = await apiClient.post("/venues", dto);
    return res.data.data;
};

export const updateVenue = async (id: number, dto: VenueRequestDto): Promise<VenueResponseDto> => {
    const res = await apiClient.put(`/venues/${id}`, dto);
    return res.data.data;
};

export const deleteVenue = async (id: number): Promise<void> => {
    await apiClient.delete(`/venues/${id}`);
};
