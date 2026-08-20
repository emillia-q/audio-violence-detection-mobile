import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet} from "react-native";

interface ManageAlertSheetProps {
    isVisible: boolean;
    alertId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageAlertSheet({isVisible, alertId, onClose, onSuccess}: ManageAlertSheetProps) {
    const theme = useTheme();


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