import {useTheme} from "@/src/context/ModeContext";
import {Alert, StyleSheet, Text, View} from "react-native";
import {alertService} from "@/src/api/service/alert";
import Toast from "react-native-toast-message";
import BottomSheet from "@/src/components/ui/BottomSheet";
import {CustomButton} from "@/src/components/ui/CustomButton";

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
    };

    return (
        <BottomSheet
            isVisible={isVisible}
            onClose={onClose}
        >
            <View style={styles.content}>
                <Text style={[styles.title, {color: theme.text}]}>Manage Alert</Text>
                <Text style={[styles.subtitle, {color: theme.muted}]}>Did your device trigger a false alarm?</Text>

                {/* Delete button */}
                <View style={styles.button}>
                    <CustomButton
                        title={"Delete false alarm"}
                        variant={"outline"}
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
    subtitle: {
        fontSize: 14,
        marginBottom: 24,
    },
    button: {
        gap: 16,
    },
});