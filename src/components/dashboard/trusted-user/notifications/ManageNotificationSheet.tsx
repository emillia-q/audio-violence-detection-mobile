import {StyleSheet} from "react-native";
import {useTheme} from "@/src/context/ModeContext";
import {notificationService} from "@/src/api/service/notification";
import Toast from "react-native-toast-message";

interface ManageNotificationSheetProps {
    isVisible: boolean;
    notificationId: number | null;
    isRead: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageNotificationSheet({isVisible, notificationId, isRead, onClose, onSuccess}: ManageNotificationSheetProps) {
    const theme = useTheme();

    // Toggle isRead flag
    const handleToggle = async () => {
        if (!notificationId)
            return;

        try {
            await notificationService.toggleNotificationStatus(notificationId);
            onSuccess();
            onClose();
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 404) {
                Toast.show({type: 'error', text1: 'Notification not found'});
            } else {
                Toast.show({type: 'error', text1: 'Failed to delete notification'});
            }
        }
    };
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