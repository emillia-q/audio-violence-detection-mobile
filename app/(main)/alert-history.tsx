import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import {AlertListResponse} from "@/src/api/dto/response/AlertListResponse";
import {alertService} from "@/src/api/service/alert";
import Toast from "react-native-toast-message";
import {StyleSheet, View} from "react-native";
import { Stack } from "expo-router";

const PAGE_SIZE = 10;

export default function AlertHistoryScreen() {
    const theme = useTheme();

    const [page, setPage] = useState(0);
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});