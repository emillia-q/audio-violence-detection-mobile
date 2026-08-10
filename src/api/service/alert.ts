import {AlertListResponse} from "@/src/api/dto/response/AlertListResponse";
import {apiClient} from "@/src/api/client";

const PATH = '/alerts'

export const alertService = {
    getListOfAlerts: async (): Promise<AlertListResponse[]> => {
        const response = await apiClient.get(`${PATH}`);

        // 204
        if (response.status === 204)
            return [];

        return response.data;
    }
};