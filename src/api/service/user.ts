import {TrustedUserListResponse} from "@/src/api/dto/response/TrustedUserListResponse";
import {apiClient} from "@/src/api/client";
import {ProtectedUserListResponse} from "@/src/api/dto/response/ProtectedUserListResponse";
import {TrustedUserDetailsResponse} from "@/src/api/dto/response/TrustedUserDetailsResponse";
import {AddTrustedUserRequest} from "@/src/api/dto/request/AddTrustedUserRequest";
import {ChangeNicknameRequest} from "@/src/api/dto/request/ChangeNicknameRequest";
import {ProtectedUserDetailsResponse} from "@/src/api/dto/response/ProtectedUserDetailsResponse";

const PATH = '/users'

export const userService = {
    // Trusted Users
    getListOfTrustedUsers: async (): Promise<TrustedUserListResponse[]> => {
        const response = await apiClient.get(`${PATH}/trusted-users`);

        // 204 support
        if (response.status === 204)
            return [];

        return response.data;
    },

    getTrustedUser: async (id: number): Promise<TrustedUserDetailsResponse> => {
        const response = await apiClient.get(`${PATH}/trusted-users/${id}`);
        return response.data;
    },

    addTrustedUser: async (data: AddTrustedUserRequest): Promise<TrustedUserDetailsResponse> => {
        const response = await apiClient.post<TrustedUserDetailsResponse>(`${PATH}/trusted-users`, data);
        return response.data;
    },

    changeTrustedUserNickname: async (id: number, data: ChangeNicknameRequest): Promise<TrustedUserDetailsResponse> => {
        const response = await apiClient.patch<TrustedUserDetailsResponse>(`${PATH}/trusted-users/${id}`, data);
        return response.data;
    },

    deleteTrustedUser: async (id: number): Promise<void> => {
        await apiClient.delete(`${PATH}/trusted-users/${id}`);
    },

    // Protected users
    getListOfProtectedUsers: async (): Promise<ProtectedUserListResponse[]> => {
        const response = await apiClient.get(`${PATH}/protected-users`);

        // 204
        if (response.status === 204)
            return [];

        return response.data;
    },

    changeProtectedUserNickname: async (id: number, data: ChangeNicknameRequest): Promise<ProtectedUserDetailsResponse> => {
        const response = await apiClient.patch(`${PATH}/protected-users/${id}`, data);
        return response.data;
    },

    deleteProtectedUser: async (id: number): Promise<void> => {
        await apiClient.delete(`${PATH}/protected-users/${id}`);
    }
};