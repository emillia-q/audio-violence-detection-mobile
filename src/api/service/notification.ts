import {NotificationListResponse} from "@/src/api/dto/response/NotificationListResponse";
import {apiClient} from "@/src/api/client";

const PATH = '/notifications'

export const notificationService = {
    getProtectedUsersNotifications: async (): Promise<NotificationListResponse[]> => {
        const response = await apiClient.get(`${PATH}`);

        // 204
        if (response.status === 204)
            return [];

        return response.data;
    }
};