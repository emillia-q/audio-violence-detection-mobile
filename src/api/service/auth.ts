import {LoginRequest} from "@/src/api/dto/request/LoginRequest";
import {AuthResponse} from "@/src/api/dto/response/AuthResponse";
import {apiClient} from "@/src/api/client";

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        return response.data;
    }
}