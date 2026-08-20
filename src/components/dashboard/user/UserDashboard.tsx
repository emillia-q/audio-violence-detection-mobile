import {ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
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
import Toast from "react-native-toast-message";
import {useTheme} from "@/src/context/ModeContext";
import ManageUserSheet from "@/src/components/dashboard/shared/ManageUserSheet";

export default function UserDashboard() {
    const theme = useTheme();

    // Load/refresh
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Api data
    const [devices, setDevices] = useState<DeviceListResponse[]>([]);
    const [trustedUsers, setTrustedUsers] = useState<TrustedUserListResponse[]>([]);
    const [alerts, setAlerts] = useState<AlertListResponse[]>([]);

    // Modals
    const [isAddUserVisible, setIsAddUserVisible] = useState(false);
    const [isManageUserVisible, setIsManageUserVisible] = useState(false);

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    // Fetch api data
    const fetchDashboardData = async (isRefresh = false) => {
        if (isRefresh)
            setIsRefreshing(true);

        // Execute requests concurrently to optimize loading time
        const [devicesResult, trustedUsersResult, alertsResult] = await Promise.allSettled([
            deviceService.getUserDevices(),
            userService.getListOfTrustedUsers(),
            alertService.getListOfAlerts()
        ]);

        let hasErrors = false;

        // Devices
        if (devicesResult.status === 'fulfilled')
            setDevices(devicesResult.value);
        else
            hasErrors = true;

        // Trusted Users
        if (trustedUsersResult.status === 'fulfilled')
            setTrustedUsers(trustedUsersResult.value);
        else
            hasErrors = true;

        // Alerts
        if (alertsResult.status === 'fulfilled')
            setAlerts(alertsResult.value);
        else
            hasErrors = true;

        if (hasErrors) {
            Alert.alert(
                "Sync Issue",
                "Some dashboard data could not be loaded. " +
                "Please check your internet connection."
            );
        }

        // Remove loading flags
        if (isRefresh)
            setIsRefreshing(false);
        else
            setIsLoading(false);
    };
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Add new trusted user modal
    const handleAddTrustedUser = async (email: string, nickname: string) => {
        try {
            await userService.addTrustedUser({
                email: email,
                customNickname: nickname.length > 0 ? nickname : undefined
            });

            // Hide bottom sheet
            setIsAddUserVisible(false);

            // Toast success
            Toast.show({
                type: 'success',
                text1: 'Trusted user added',
                position: 'top',
                visibilityTime: 4000,
            });

            // After successful operation -> refresh the list
            const updatedList = await userService.getListOfTrustedUsers();
            setTrustedUsers(updatedList);

            // Send to modal
            return { success: true };
        } catch (error: any) {
            // Send to modal
            return {
                success: false,
                status: error?.response?.status
            };
        }
    }

    // Loading screen at first
    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size={"large"} color={theme.tint} />
            </View>
        );
    }

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false} // Hide scroll bar
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => fetchDashboardData(true)}
                        tintColor={theme.tint} // iOS
                        colors={[theme.tint]} // Android
                    />
                }
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
                        onUserPress={(id) => {
                            setSelectedUserId(id);
                            setIsManageUserVisible(true);
                        }}
                    />
                </DashboardSection>
                <DashboardSection title={"Recent alerts"}>
                    <AlertList alerts={alerts}/>
                </DashboardSection>
            </ScrollView>

            {/* Modals */}
            <AddTrustedUserSheet
                isVisible={isAddUserVisible}
                onClose={() => setIsAddUserVisible(false)}
                onSubmit={handleAddTrustedUser}
            />

            <ManageUserSheet
                isVisible={isManageUserVisible}
                userId={selectedUserId}
                userType={"trusted"}
                onClose={() => {
                    setIsManageUserVisible(false);
                    setSelectedUserId(null);
                }}
                onSuccess={() => fetchDashboardData(true)}
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
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});