import {NotificationListResponse} from "@/src/api/dto/response/NotificationListResponse";
import {StyleSheet, View} from "react-native";
import EmptyListView from "@/src/components/ui/EmptyListView";
import NavigationCard from "@/src/components/ui/NavigationCard";
import {formatDateTime} from "@/src/utils/dateUtils";

interface NotificationListProps {
    notifications: NotificationListResponse[];
}

export default function NotificationList({notifications}: NotificationListProps) {
    // 204 - empty list
    if (notifications.length === 0) {
        return (
            <EmptyListView
                title={'No recent notifications'}
                iconName={"notifications-off-outline"}
            />
        );
    }

    // 200 - list of notifications
    return (
        <View style={styles.listContainer}>
            {notifications.map((notification) => (
                <NavigationCard
                    key={notification.notificationId}
                    title={notification.protectedUserDisplayName}
                    subtitle={formatDateTime(notification.createdAt)}
                    isRead={notification.isRead}
                    onPress={() => console.log(`Notification with id: ${notification.notificationId}`)}
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