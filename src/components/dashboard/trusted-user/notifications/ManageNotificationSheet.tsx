import {StyleSheet} from "react-native";

interface ManageNotificationSheetProps {
    isVisible: boolean;
    notificationId: number | null;
    isRead: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageNotificationSheet({isVisible, notificationId, isRead, onClose, onSuccess}: ManageNotificationSheetProps) {

}

const styles = StyleSheet.create({
    content: {
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 24,
    },
    button: {
        gap: 16,
    },
});