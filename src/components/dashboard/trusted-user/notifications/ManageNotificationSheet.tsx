import {Alert, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@/src/context/ModeContext";
import {notificationService} from "@/src/api/service/notification";
import Toast from "react-native-toast-message";
import BottomSheet from "@/src/components/ui/BottomSheet";
import {CustomButton} from "@/src/components/ui/CustomButton";

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

    // Delete notification
    const handleDelete = () => {
        Alert.alert()
    };

    return (
        <BottomSheet
            isVisible={isVisible}
            onClose={onClose}
        >
            <View style={styles.content}>
                <Text style={[styles.title, {color: theme.text}]}>Manage Notification</Text>
                <View style={styles.button}>
                    <CustomButton
                        title={isRead ? "Mark as unread" : "Mark as read"}
                        variant={"outline"}
                        onPress={handleToggle}
                    />
                    <CustomButton
                        title={"Delete notification"}
                        variant={"text"}
                        isDanger={true}
                        onPress={handleDelete}
                    />
                </View>
            </View>
        </BottomSheet>
    );
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
    button: {
        gap: 16,
    },
});