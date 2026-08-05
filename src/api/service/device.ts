import {DeviceListResponse} from "@/src/api/dto/response/DeviceListResponse";
import {apiClient} from "@/src/api/client";

const PATH = '/devices'

export const deviceService = {
    getUserDevices: async (): Promise<DeviceListResponse[]> => {
        const response = await apiClient.get(`${PATH}`);

        // 204 support
        if (response.status === 204)
            return [];

        return response.data;
    }
};