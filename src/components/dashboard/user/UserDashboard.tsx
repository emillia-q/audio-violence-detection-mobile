import {ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {DeviceListResponse} from "@/src/api/dto/response/DeviceListResponse";
import {deviceService} from "@/src/api/service/device";
import DeviceList from "@/src/components/dashboard/user/devices/DeviceList";
import {TrustedUserListResponse} from "@/src/api/dto/response/TrustedUserListResponse";
import {userService} from "@/src/api/service/user";
import TrustedUserList from "@/src/components/dashboard/user/trusted-users/TrustedUserList";
import {AlertListResponse} from "@/src/api/dto/response/AlertListResponse";
import {alertService} from "@/src/api/service/alert";
import AlertList from "@/src/components/dashboard/user/alerts/AlertList";
import DashboardSection from "@/src/components/dashboard/shared/DashboardSection";

export default function UserDashboard() {
    const [devices, setDevices] = useState<DeviceListResponse[]>([]);
    const [trustedUsers, setTrustedUsers] = useState<TrustedUserListResponse[]>([]);
    const [alerts, setAlerts] = useState<AlertListResponse[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Execute requests concurrently to optimize loading time
                const [devicesResult, trustedUsersResult, alertsResult] = await Promise.allSettled([
                    deviceService.getUserDevices(),
                    userService.getListOfTrustedUsers(),
                    alertService.getListOfAlerts()
                ]);

                // Devices
                if (devicesResult.status === 'fulfilled')
                    setDevices(devicesResult.value);
                else
                    console.error('Could not load devices: ', devicesResult.reason);

                // Trusted Users
                if (trustedUsersResult.status === 'fulfilled')
                    setTrustedUsers(trustedUsersResult.value);
                else
                    console.error('Could not load trusted users: ', trustedUsersResult.reason);

                // Alerts
                if (alertsResult.status === 'fulfilled')
                    setAlerts(alertsResult.value);
                else
                    console.error('Could not load alerts: ', alertsResult.reason);
            } catch (error) {
                alert(error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false} // Hide scroll bar
        >
            <DashboardSection title={"My devices"}>
                <DeviceList devices={devices}/>
            </DashboardSection>
            <DashboardSection title={"Trusted users"}>
                <TrustedUserList trustedUsers={trustedUsers}/>
            </DashboardSection>
            <DashboardSection title={"Recent alerts"}>
                <AlertList alerts={alerts}/>
            </DashboardSection>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
        padding: 16,
        gap: 24,
        paddingBottom: 40,
    }
});