import {ScrollView, StyleSheet} from "react-native";
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
import {CustomButton} from "@/src/components/ui/CustomButton";
import AddTrustedUserSheet from "@/src/components/dashboard/user/trusted-users/AddTrustedUserSheet";

export default function UserDashboard() {
    const [devices, setDevices] = useState<DeviceListResponse[]>([]);
    const [trustedUsers, setTrustedUsers] = useState<TrustedUserListResponse[]>([]);
    const [alerts, setAlerts] = useState<AlertListResponse[]>([]);
    const [isAddUserVisible, setIsAddUserVisible] = useState(false);

    // Fetch api data
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

    // Add new trusted user
    const handleAddTrustedUser = async (email: string, nickname: string) => {
        try {
            await userService.addTrustedUser({
                email: email,
                customNickname: nickname.length > 0 ? nickname : undefined
            });

            // After successful operation -> refresh the list
            const updatedList = await userService.getListOfTrustedUsers();
            setTrustedUsers(updatedList);

            // Hide bottom sheet
            setIsAddUserVisible(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false} // Hide scroll bar
            >
                <DashboardSection
                    title={"My devices"}
                    actionButton={
                        devices.length > 0 && (
                            <CustomButton
                                title={"+ Add device"}
                                variant={"text"}
                                onPress={() => console.log('Add device')}
                            />
                        )
                    }
                >
                    <DeviceList devices={devices}/>
                </DashboardSection>
                <DashboardSection
                    title={"Trusted users"}
                    actionButton={
                        trustedUsers.length > 0 && (
                            <CustomButton
                                title={"+ Add trusted user"}
                                variant={"text"}
                                onPress={() => setIsAddUserVisible(true)}
                            />
                        )
                    }
                >
                    <TrustedUserList
                        trustedUsers={trustedUsers}
                        onAddTrustedUser={() => setIsAddUserVisible(true)}
                    />
                </DashboardSection>
                <DashboardSection title={"Recent alerts"}>
                    <AlertList alerts={alerts}/>
                </DashboardSection>
            </ScrollView>

            {/* Modal */}
            <AddTrustedUserSheet
                isVisible={isAddUserVisible}
                onClose={() => setIsAddUserVisible(false)}
                onSubmit={handleAddTrustedUser}
            />
        </>
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