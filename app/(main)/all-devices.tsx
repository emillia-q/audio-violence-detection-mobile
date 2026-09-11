import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import Toast from "react-native-toast-message";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {Stack} from "expo-router";
import PaginationFooter from "@/src/components/ui/PaginationFooter";
import {DeviceListResponse} from "@/src/api/dto/response/DeviceListResponse";
import {deviceService} from "@/src/api/service/device";
import DeviceList from "@/src/components/dashboard/user/devices/DeviceList";
import ManageDeviceSheet from "@/src/components/dashboard/user/devices/ManageDeviceSheet";

const PAGE_SIZE = 10;

export default function AllDevicesScreen() {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [devices, setDevices] = useState<DeviceListResponse[]>([]);
    const [isManageDeviceVisible, setIsManageDeviceVisible] = useState(false);
    const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

    const fetchDevices = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const data = await deviceService.getUserDevices(pageNumber, PAGE_SIZE);
            setDevices(data);
            if (data.length < PAGE_SIZE)
                setHasMorePages(false);
            else
                setHasMorePages(true);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error fetching devices',
            });
        } finally {
            setIsLoading(false);
        }
    }

    // Refresh each time teh page changes
    useEffect(() => {
        fetchDevices(page);
    }, [page]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header config via expo-router */}
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "My devices",
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
                        <DeviceList
                            devices={devices}
                            onDevicePress={(id) => {
                                setSelectedDeviceId(id);
                                setIsManageDeviceVisible(true);
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
                    <ManageDeviceSheet
                        isVisible={isManageDeviceVisible}
                        deviceId={selectedDeviceId}
                        onClose={() => {
                            setIsManageDeviceVisible(false);
                            setSelectedDeviceId(null);
                        }}
                        onSuccess={() => fetchDevices(page)}
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