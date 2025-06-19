import {OnboardRequestDto, SuccessfulOnboardDto} from "../../types/auth.ts";
import {DefaultApiResponse} from "../../types/api.ts";
import apiClient from "./apiClient.ts";

export const onboardHod = async (dto: OnboardRequestDto): Promise<DefaultApiResponse<SuccessfulOnboardDto>> => {
    const response = await apiClient.post("/auth/onboard", dto);
    return response.data;
};
