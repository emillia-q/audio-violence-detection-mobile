import {NotificationListResponse} from "@/src/api/dto/response/NotificationListResponse";
import {StyleSheet, View} from "react-native";
import EmptyListView from "@/src/components/ui/EmptyListView";
import NavigationCard from "@/src/components/ui/NavigationCard";
import {formatDateTime} from "@/src/utils/dateUtils";

interface NotificationListProps {
    notifications: NotificationListResponse[];
    onManage?: (id: number, isRead: boolean) => void;
}

export default function NotificationList({notifications, onManage}: NotificationListProps) {
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
                    iconName="warning-outline"
                    onPress={() => onManage && onManage(notification.notificationId, notification.isRead)}
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