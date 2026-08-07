import {TrustedUserListResponse} from "@/src/api/dto/response/TrustedUserListResponse";
import {apiClient} from "@/src/api/client";

const PATH = '/trusted-users'

export const userService = {
    getListOfTrustedUsers: async (): Promise<TrustedUserListResponse[]> => {
        const response = await apiClient.get(`${PATH}`);

        // 204 support
        if (response.status === 204)
            return [];

        return response.data;
    }
};