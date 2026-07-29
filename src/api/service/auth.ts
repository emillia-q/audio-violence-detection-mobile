import {LoginRequest} from "@/src/api/dto/request/LoginRequest";
import {AuthResponse} from "@/src/api/dto/response/AuthResponse";
import {apiClient} from "@/src/api/client";
import {RegisterRequest} from "@/src/api/dto/request/RegisterRequest";

const PATH = '/auth'

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(`${PATH}/login`, data);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('${PATH}/register', data);
        return response.data;
    }
}