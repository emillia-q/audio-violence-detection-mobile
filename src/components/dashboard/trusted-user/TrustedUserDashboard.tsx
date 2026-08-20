import {ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {ProtectedUserListResponse} from "@/src/api/dto/response/ProtectedUserListResponse";
import {userService} from "@/src/api/service/user";
import ProtectedUserList from "@/src/components/dashboard/trusted-user/protected-users/ProtectedUserList";
import DashboardSection from "@/src/components/dashboard/shared/DashboardSection";
import NotificationList from "@/src/components/dashboard/trusted-user/notifications/NotificationList";
import {NotificationListResponse} from "@/src/api/dto/response/NotificationListResponse";
import {notificationService} from "@/src/api/service/notification";
import {useTheme} from "@/src/context/ModeContext";
import ManageUserSheet from "@/src/components/dashboard/shared/ManageUserSheet";
import {CustomButton} from "@/src/components/ui/CustomButton";
import ManageNotificationSheet from "@/src/components/dashboard/trusted-user/notifications/ManageNotificationSheet";

export default function TrustedUserDashboard() {
    const theme = useTheme();

    // Api data
    const [notifications, setNotifications] = useState<NotificationListResponse[]>([]);
    const [protectedUsers, setProtectedUsers] = useState<ProtectedUserListResponse[]>([]);

    // Load/refresh
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Modals
    const [isManageUserVisible, setIsManageUserVisible] = useState(false);
    const [isManageNotificationVisible, setIsManageNotificationVisible] = useState(false);

    // IDs
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);

    // States
    const [selectedNotificationIsRead, setSelectedNotificationIsRead] = useState(false);


    const fetchDashboardData = async (isRefresh = false) => {
        if (isRefresh)
            setIsRefreshing(true);

        const [notificationsResult, protectedUsersResult] = await Promise.allSettled([
            notificationService.getProtectedUsersNotifications(0, 3),
            userService.getListOfProtectedUsers()
        ]);

        let hasErrors = false;

        // Notifications
        if (notificationsResult.status === 'fulfilled')
            setNotifications(notificationsResult.value);
        else
            hasErrors = true;

        // Protected Users
        if (protectedUsersResult.status === 'fulfilled')
            setProtectedUsers(protectedUsersResult.value);
        else
            hasErrors = true;

        if (hasErrors) {
            Alert.alert(
                "Sync Issue",
                "Some dashboard data could not be loaded. " +
                "Please check your internet connection."
            );
        }

        if (isRefresh)
            setIsRefreshing(false);
        else
            setIsLoading(false);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Loading screen at first
    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size={"large"} color={theme.tint}/>
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
                    title={"Notifications"}
                    actionButton={
                        notifications.length > 0 && (
                            <CustomButton
                                title={"View all"}
                                variant={"text"}
                                onPress={() => console.log("full notification history")}
                            />
                        )
                    }
                >
                    <NotificationList
                        notifications={notifications}
                        onManage={(id, isRead) => {
                            setIsManageNotificationVisible(true);
                            setSelectedNotificationId(id);
                            setSelectedNotificationIsRead(isRead);
                        }}
                    />
                </DashboardSection>
                <DashboardSection title={"Protected users"}>
                    <ProtectedUserList
                        protectedUsers={protectedUsers}
                        onUserPress={(id) => {
                            setSelectedUserId(id);
                            setIsManageUserVisible(true)
                        }}
                    />
                </DashboardSection>
            </ScrollView>

            {/* Modals */}
            <ManageNotificationSheet
                isVisible={isManageNotificationVisible}
                notificationId={selectedNotificationId}
                isRead={selectedNotificationIsRead}
                onClose={() => {
                    setIsManageNotificationVisible(false);
                    setSelectedNotificationId(null);
                }}
                onSuccess={() => fetchDashboardData(true)}
            />

            <ManageUserSheet
                isVisible={isManageUserVisible}
                userId={selectedUserId}
                userType={"protected"}
                onClose={() => {
                    setSelectedUserId(null);
                    setIsManageUserVisible(false)
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