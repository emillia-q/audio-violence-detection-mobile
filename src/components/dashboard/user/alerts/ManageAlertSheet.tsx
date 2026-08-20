import {useTheme} from "@/src/context/ModeContext";
import {Alert, StyleSheet} from "react-native";
import {alertService} from "@/src/api/service/alert";
import Toast from "react-native-toast-message";

interface ManageAlertSheetProps {
    isVisible: boolean;
    alertId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageAlertSheet({isVisible, alertId, onClose, onSuccess}: ManageAlertSheetProps) {
    const theme = useTheme();

    const handleDelete = () => {
        Alert.alert(
            "False Alarm",
            "Are you sure you want to mark this alert as a false alarm and delete it?",
            [
                {text: "Cancel", style: "cancel"},
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
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
                    }
                }
            ]
        )
    }
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