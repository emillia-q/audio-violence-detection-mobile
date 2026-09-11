import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import {AlertListResponse} from "@/src/api/dto/response/AlertListResponse";
import {alertService} from "@/src/api/service/alert";
import Toast from "react-native-toast-message";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import { Stack } from "expo-router";
import AlertList from "@/src/components/dashboard/user/alerts/AlertList";
import ManageAlertSheet from "@/src/components/dashboard/user/alerts/ManageAlertSheet";
import {CustomButton} from "@/src/components/ui/CustomButton";

const PAGE_SIZE = 10;

export default function AlertHistoryScreen() {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [alerts, setAlerts] = useState<AlertListResponse[]>([]);
    const [isManageAlertVisible, setIsManageAlertVisible] = useState(false);
    const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
    const [selectedAlertIsRead, setSelectedAlertIsRead] = useState(false);

    const fetchAlerts = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const data = await alertService.getListOfAlerts(pageNumber, PAGE_SIZE);
            setAlerts(data);
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
        fetchAlerts(page);
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
                        <AlertList
                            alerts={alerts}
                            onManage={(id, isRead) => {
                                setSelectedAlertId(id);
                                setSelectedAlertIsRead(isRead);
                                setIsManageAlertVisible(true);
                            }}
                        />
                    </ScrollView>

                    {/* Pagination */}
                    <View style={styles.paginationContainer}>
                        <CustomButton
                            title={"Prev"}
                            variant={"text"}
                            disabled={page === 0}
                            onPress={() => {
                                setPage(prev => Math.max(0, prev - 1))
                            }}
                        />
                        <CustomButton
                            title={"Next"}
                            variant={"text"}
                            disabled={!hasMorePages}
                            onPress={() => {
                                setPage(prev => prev + 1)
                            }}
                        />
                    </View>

                    {/* Alert manage modal */}
                    <ManageAlertSheet
                        isVisible={isManageAlertVisible}
                        alertId={selectedAlertId}
                        isRead={selectedAlertIsRead}
                        onClose={() => {
                            setIsManageAlertVisible(false);
                            setSelectedAlertId(null);
                        }}
                        onSuccess={() => fetchAlerts(page)}
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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 48,
    }
});