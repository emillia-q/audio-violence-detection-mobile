import {AlertListResponse} from "@/src/api/dto/response/AlertListResponse";
import {apiClient} from "@/src/api/client";

const PATH = '/alerts'

export const alertService = {
    getListOfAlerts: async (pageNumber: number = 0, pageSize: number = 5): Promise<AlertListResponse[]> => {
        const response = await apiClient.get(`${PATH}?pageNumber=${pageNumber}&pageSize=${pageSize}`);

        // 204
        if (response.status === 204)
            return [];

        return response.data;
    },

    toggleNotificationStatusByAlertId: async (id: number): Promise<void> => {
        await apiClient.patch(`${PATH}/${id}/toggle-status`);
    },

    deleteFalseAlert: async (id: number): Promise<void> => {
        await apiClient.delete(`${PATH}/${id}`);
    }
};