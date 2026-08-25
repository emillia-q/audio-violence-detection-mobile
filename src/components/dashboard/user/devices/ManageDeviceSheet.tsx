import {StyleSheet} from "react-native";

interface ManageDeviceSheetProps {
    isVisible: boolean;
    deviceId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}

const styles = StyleSheet.create({
    content: {
        padding: 24,
    },
    loadingContainer: {
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
});