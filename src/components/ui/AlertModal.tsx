import {useTheme} from "@/src/context/ModeContext";
import {Modal, StyleSheet, View} from "react-native";

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
});