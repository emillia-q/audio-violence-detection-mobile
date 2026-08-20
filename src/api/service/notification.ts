import {NotificationListResponse} from "@/src/api/dto/response/NotificationListResponse";
import {apiClient} from "@/src/api/client";

const PATH = '/notifications'

export const notificationService = {
    getProtectedUsersNotifications: async (pageNumber: number = 0, pageSize: number = 5): Promise<NotificationListResponse[]> => {
        const response = await apiClient.get(`${PATH}?pageNumber=${pageNumber}&pageSize=${pageSize}`);

        // 204
        if (response.status === 204)
            return [];

        return response.data;
    },

    toggleNotificationStatus: async (id: number): Promise<void> => {
        await apiClient.patch(`${PATH}/${id}/toggle-status`);
    }
};