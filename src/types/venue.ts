export interface VenueRequestDto {
    name: string;
    capacity: number;
    available: boolean;
    collegeBuildingCode: string;
}

export interface VenueResponseDto {
    id: number;
    name: string;
    capacity: number;
    available: boolean;
    collegeBuildingCode: string;
    collegeBuildingName: string;
}
