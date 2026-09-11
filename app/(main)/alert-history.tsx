import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import {AlertListResponse} from "@/src/api/dto/response/AlertListResponse";
import {alertService} from "@/src/api/service/alert";
import Toast from "react-native-toast-message";

const PAGE_SIZE = 10;

export default function AlertHistoryScreen() {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [alerts, setAlerts] = useState<AlertListResponse[]>([]);
    const [isManageAlertVisible, setIsManageAlertVisible] = useState(false);
    const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
    const [selectedAlertIsRead, setSelectedAlertIsRead] = useState(false);

    const fetchAlerts = async (pageNumber: number) => {
        try {
            const data = await alertService.getListOfAlerts(pageNumber, PAGE_SIZE);
            setAlerts(data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error fetching alerts',
            });
        }
    }

    // Refresh each time teh page changes
    useEffect(() => {
        fetchAlerts(page);
    }, [page]);
}