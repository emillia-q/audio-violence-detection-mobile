import {AlertListResponse} from "@/src/api/dto/response/AlertListResponse";
import NavigationCard from "@/src/components/ui/NavigationCard";
import EmptyListView from "@/src/components/ui/EmptyListView";
import {StyleSheet, View} from "react-native";

interface AlertListProps {
    alerts: AlertListResponse[];
}

export default function AlertList({alerts}: AlertListProps) {
    // 204 - empty list
    if (alerts.length === 0) {
        return (
            <EmptyListView title={'No recent alerts'}/>
        );
    }

    // 200 - list of alerts
    return (
        <View style={styles.listContainer}>
            {alerts.map((alert) => (
                <NavigationCard
                    key={alert.id}
                    title={alert.deviceName}
                    subtitle={alert.createdAt}
                    isRead={alert.isRead}
                    onPress={() => console.log(`Alert with id: ${alert.id}`)}
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