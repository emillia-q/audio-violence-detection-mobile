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
            <EmptyListView
                title={'No recent alerts'}
                iconName={"notifications-off-outline"}
            />
        );
    }

    // Format date
    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        if (date.toDateString() === today.toDateString())
            return `Today, ${time}`;
        else if (date.toDateString() === yesterday.toDateString())
            return `Yesterday, ${time}`;
        else {
            const day = date.toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'});
            return `${day}, ${time}`;
        }
    };

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