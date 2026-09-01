import {useTheme} from "@/src/context/ModeContext";
import {Alert, StyleSheet, Text, View} from "react-native";
import {alertService} from "@/src/api/service/alert";
import Toast from "react-native-toast-message";
import BottomSheet from "@/src/components/ui/BottomSheet";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {useState} from "react";
import AlertModal from "@/src/components/ui/AlertModal";

interface ManageAlertSheetProps {
    isVisible: boolean;
    alertId: number | null;
    isRead: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageAlertSheet({isVisible, alertId, isRead, onClose, onSuccess}: ManageAlertSheetProps) {
    const theme = useTheme();
    const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

    // Toggle isRead flag
    const handleToggleStatus = async () => {
        if (!alertId) return;

        try {
            await alertService.toggleNotificationStatusByAlertId(alertId);
            onSuccess();
            onClose();
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 404) {
                Toast.show({type: 'error', text1: 'Alert not found'});
            } else {
                Toast.show({type: 'error', text1: 'Failed to update status'});
            }
        }
    };

    // Delete alert
    const handleDeletePress = () => {
        setIsAlertModalVisible(true);
    };

    const handleConfirm = async () => {
        setIsAlertModalVisible(false);

        if (!alertId)
            return;

        try {
            await alertService.deleteFalseAlert(alertId);

            // Toast success
            Toast.show({
                type: "success",
                text1: "Alert removed"
            });

            onSuccess();
            onClose();
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 404) {
                Toast.show({type: 'error', text1: 'Alert not found'});
            } else {
                Toast.show({type: 'error', text1: 'Failed to delete alert'});
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
                    <Text style={[styles.title, {color: theme.text}]}>Manage Alert</Text>

                    <View style={styles.button}>
                        {/* Status button */}
                        <CustomButton
                            title={isRead ? "Mark as unread" : "Mark as read"}
                            variant={"outline"}
                            onPress={handleToggleStatus}
                        />
                        {/* Delete button */}
                        <CustomButton
                            title={"Delete false alarm"}
                            variant={"text"}
                            isDanger={true}
                            onPress={handleDeletePress}
                        />
                    </View>
                </View>
            </BottomSheet>

            {/* Modals */}
            <AlertModal
                title={"False Alarm"}
                message={"Are you sure you want to mark this alert as a false alarm and delete it?"}
                isVisible={isAlertModalVisible}
                cancelText={"Cancel"}
                confirmText={"Delete"}
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
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 24,
    },
    button: {
        gap: 16,
    },
});