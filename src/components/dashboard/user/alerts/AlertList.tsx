import {AlertListResponse} from "@/src/api/dto/response/AlertListResponse";
import NavigationCard from "@/src/components/ui/NavigationCard";
import EmptyListView from "@/src/components/ui/EmptyListView";
import {StyleSheet, View} from "react-native";
import {formatDateTime} from "@/src/utils/dateUtils";

interface AlertListProps {
    alerts: AlertListResponse[];
    onManage?: (id: number) => void;
}

export default function AlertList({alerts, onManage}: AlertListProps) {
    // 204 - empty list
    if (alerts.length === 0) {
        return (
            <EmptyListView
                title={'No recent alerts'}
                iconName={"notifications-off-outline"}
            />
        );
    }

    // 200 - list of alerts
    return (
        <View style={styles.listContainer}>
            {alerts.map((alert) => (
                <NavigationCard
                    key={alert.id}
                    title={alert.deviceName}
                    subtitle={formatDateTime(alert.createdAt)}
                    isRead={alert.isRead}
                    onPress={() => console.log(`Alert with id: ${alert.id}`)}
                    onMorePress={() => onManage && onManage(alert.id)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    },
});