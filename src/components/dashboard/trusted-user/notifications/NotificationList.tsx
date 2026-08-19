import {NotificationListResponse} from "@/src/api/dto/response/NotificationListResponse";
import {StyleSheet} from "react-native";

interface NotificationListProps {
    notifications: NotificationListResponse[];
}

export default function NotificationList({notifications}: NotificationListProps) {

}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    },
});