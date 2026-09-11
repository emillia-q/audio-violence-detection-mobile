import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import Toast from "react-native-toast-message";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {Stack} from "expo-router";
import PaginationFooter from "@/src/components/ui/PaginationFooter";
import {NotificationListResponse} from "@/src/api/dto/response/NotificationListResponse";
import {notificationService} from "@/src/api/service/notification";
import NotificationList from "@/src/components/dashboard/trusted-user/notifications/NotificationList";
import ManageNotificationSheet from "@/src/components/dashboard/trusted-user/notifications/ManageNotificationSheet";

const PAGE_SIZE = 10;

export default function NotificationHistoryScreen() {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState<NotificationListResponse[]>([]);
    const [isManageNotificationVisible, setIsManageNotificationVisible] = useState(false);
    const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
    const [selectedNotificationIsRead, setSelectedNotificationIsRead] = useState(false);

    const fetchNotifications = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const data = await notificationService.getProtectedUsersNotifications(pageNumber, PAGE_SIZE);
            setNotifications(data);
            if (data.length < PAGE_SIZE)
                setHasMorePages(false);
            else
                setHasMorePages(true);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error fetching alerts',
            });
        } finally {
            setIsLoading(false);
        }
    }

    // Refresh each time teh page changes
    useEffect(() => {
        fetchNotifications(page);
    }, [page]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header config via expo-router */}
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "History of alerts",
                    headerBackTitle: "Back", // iOS
                    headerTintColor: theme.tint,
                    headerStyle: { backgroundColor: theme.background },
                    headerShadowVisible: false
                }}
            />

            {isLoading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size={"large"} color={theme.tint}/>
                </View>
            ) : (
                <>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <NotificationList
                            notifications={notifications}
                            onManage={(id, isRead) => {
                                setSelectedNotificationId(id);
                                setSelectedNotificationIsRead(isRead);
                                setIsManageNotificationVisible(true);
                            }}
                        />
                    </ScrollView>

                    {/* Pagination */}
                    <PaginationFooter
                        page={page}
                        hasMorePages={hasMorePages}
                        onPrev={() => {
                            setPage(prev => Math.max(0, prev - 1))
                        }}
                        onNext={() => {
                            setPage(prev => prev + 1)
                        }}
                    />

                    {/* Alert manage modal */}
                    <ManageNotificationSheet
                        isVisible={isManageNotificationVisible}
                        notificationId={selectedNotificationId}
                        isRead={selectedNotificationIsRead}
                        onClose={() => {
                            setIsManageNotificationVisible(false);
                            setSelectedNotificationId(null);
                        }}
                        onSuccess={() => fetchNotifications(page)}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 24,
    },
});