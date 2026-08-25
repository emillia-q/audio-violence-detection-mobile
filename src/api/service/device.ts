import {DeviceListResponse} from "@/src/api/dto/response/DeviceListResponse";
import {apiClient} from "@/src/api/client";
import {DeviceCredentialsRequest} from "@/src/api/dto/request/DeviceCredentialsRequest";
import {DeviceDetailsResponse} from "@/src/api/dto/response/DeviceDetailsResponse";

const PATH = '/devices'

export const deviceService = {
    getUserDevices: async (): Promise<DeviceListResponse[]> => {
        const response = await apiClient.get(`${PATH}`);

        // 204 support
        if (response.status === 204)
            return [];

        return response.data;
    },

    getDeviceDetails: async (id: number): Promise<DeviceDetailsResponse> => {
        const response = await apiClient.get(`${PATH}/${id}`);
        return response.data;
    },

    pairDevice: async (data: DeviceCredentialsRequest): Promise<DeviceDetailsResponse> => {
        const response = await apiClient.patch(`${PATH}/pair-device`, data);
        return response.data;
    }
};