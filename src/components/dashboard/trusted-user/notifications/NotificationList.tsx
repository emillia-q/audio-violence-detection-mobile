import {NotificationListResponse} from "@/src/api/dto/response/NotificationListResponse";
import {StyleSheet} from "react-native";
import EmptyListView from "@/src/components/ui/EmptyListView";

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
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    },
});