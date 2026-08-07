import {StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {DeviceListResponse} from "@/src/api/dto/response/DeviceListResponse";
import {deviceService} from "@/src/api/service/device";
import DeviceList from "@/src/components/dashboard/user/devices/DeviceList";
import {TrustedUserListResponse} from "@/src/api/dto/response/TrustedUserListResponse";
import {userService} from "@/src/api/service/user";
import TrustedUserList from "@/src/components/dashboard/user/trusted-users/TrustedUserList";

export default function UserDashboard() {
    const [devices, setDevices] = useState<DeviceListResponse[]>([]);
    const [trustedUsers, setTrustedUsers] = useState<TrustedUserListResponse[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Execute requests concurrently to optimize loading time
                const [fetchedDevices, fetchedTrustedUsers] = await Promise.all([
                    deviceService.getUserDevices(),
                    userService.getListOfTrustedUsers()
                ]);
                setDevices(fetchedDevices);
                setTrustedUsers(fetchedTrustedUsers);
            } catch (error) {
                alert(error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <View style={styles.container}>
            <DeviceList devices={devices}/>
            <TrustedUserList trustedUsers={trustedUsers}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      gap: 24,
    },
});