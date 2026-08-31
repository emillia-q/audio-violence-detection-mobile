import {useTheme} from "@/src/context/ModeContext";
import {Modal, StyleSheet, Text, View} from "react-native";

interface AlertModalProps {
    title: string;
    message: string;
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    cancelText?: string;
    confirmText?: string;
}

export default function AlertModal({
                                       title,
                                       message,
                                       isVisible,
                                       onCancel,
                                       onConfirm,
                                       cancelText = "Cancel",
                                       confirmText = "Confirm"
                                   }: AlertModalProps) {
    const theme = useTheme();

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType={"fade"}
        >
            <View style={styles.overlay}>
                <View style={[styles.alertBox, {backgroundColor: theme.surfaceElevated}]}>
                    <Text style={[styles.title, {color: theme.text}]}>{title}</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "center",
        alignItems: "center",
    },
    alertBox: {
        width: "80%",
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    }
});