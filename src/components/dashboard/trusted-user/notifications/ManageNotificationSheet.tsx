import {StyleSheet, View} from "react-native";
import {notificationService} from "@/src/api/service/notification";
import Toast from "react-native-toast-message";
import BottomSheet from "@/src/components/ui/BottomSheet";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {useState} from "react";
import AlertModal from "@/src/components/ui/AlertModal";
import SectionHeader from "@/src/components/ui/SectionHeader";

interface ManageNotificationSheetProps {
    isVisible: boolean;
    notificationId: number | null;
    isRead: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageNotificationSheet({isVisible, notificationId, isRead, onClose, onSuccess}: ManageNotificationSheetProps) {
    const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

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
                Toast.show({type: 'error', text1: 'Failed to update status'});
            }
        }
    };

    // Delete notification
    const handleDeletePress = () => {
        setIsAlertModalVisible(true);
    };

    const handleConfirm = async () => {
        setIsAlertModalVisible(false);

        if (!notificationId)
            return;

        try {
            await notificationService.deleteNotification(notificationId);
            Toast.show({
                type: 'success',
                text1: 'Notification deleted'
            });

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

    const handleCancel = () => {
        setIsAlertModalVisible(false);
    };

    return (
        <>
            <BottomSheet
                isVisible={isVisible}
                onClose={onClose}
            >
                <View style={styles.content}>
                    <SectionHeader
                        title="Manage Notification"
                        iconName="warning-outline"
                        description="Change the visibility status or permanently remove this notification from your history."
                    />

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
                            onPress={handleDeletePress}
                        />
                    </View>
                </View>
            </BottomSheet>

            {/* Modals */}
            <AlertModal
                title={"Delete Notification"}
                message={"Are you sure you want to remove this notification?"}
                isVisible={isAlertModalVisible}
                cancelText={"Cancel"}
                confirmText={"Remove"}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 24,
    },
    button: {
        gap: 16,
    },
});