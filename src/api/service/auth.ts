import {LoginRequest} from "@/src/api/dto/request/LoginRequest";
import {AuthResponse} from "@/src/api/dto/response/AuthResponse";
import {apiClient} from "@/src/api/client";
import {RegisterRequest} from "@/src/api/dto/request/RegisterRequest";

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        return response.data;
    }
}