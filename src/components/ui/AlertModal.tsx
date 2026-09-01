import {useTheme} from "@/src/context/ModeContext";
import {Modal, StyleSheet, Text, View} from "react-native";
import {CustomButton} from "@/src/components/ui/CustomButton";

interface AlertModalProps {
    title: string;
    message: string;
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    cancelText?: string;
    confirmText?: string;
    showCancelButton?: boolean;
}

export default function AlertModal({
                                       title,
                                       message,
                                       isVisible,
                                       onCancel,
                                       onConfirm,
                                       cancelText = "Cancel",
                                       confirmText = "Confirm",
                                       showCancelButton = true,
                                   }: AlertModalProps) {
    const theme = useTheme();

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType={"fade"}
        >
            <View style={styles.overlay}>

                {/* Main container */}
                <View style={[styles.alertBox, {backgroundColor: theme.surfaceElevated}]}>

                    {/* Title */}
                    <Text style={[styles.title, {color: theme.text}]}>{title}</Text>

                    {/* Message */}
                    <Text style={[styles.message, {color: theme.muted}]}>{message}</Text>

                    {/* Buttons */}
                    <View style={[styles.buttonContainer, !showCancelButton && {justifyContent: "center"}]}>

                        {/* Cancel */}
                        {showCancelButton && (
                            <CustomButton
                                title={cancelText}
                                variant={"text"}
                                onPress={onCancel}
                            />
                        )}

                        {/* Confirm */}
                        <CustomButton
                            title={confirmText}
                            isDanger={showCancelButton}
                            variant={"text"}
                            onPress={onConfirm}
                        />
                    </View>
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
        shadowOffset: {width: 0, height: -4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 24,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
    }
});