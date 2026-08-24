import {useTheme} from "@/src/context/ModeContext";
import {useCameraPermissions} from "expo-camera";
import {StyleSheet, Text, View} from "react-native";
import {CustomButton} from "@/src/components/ui/CustomButton";

interface DeviceScannerProps {
    onScan: (macAddress: string, deviceSecret: string) => void;
    onSwitchToManual: () => void;
}

export default function DeviceScanner({onScan, onSwitchToManual}: DeviceScannerProps) {
    const theme = useTheme();
    const [permission, requestPermission] = useCameraPermissions();

    // Check if permission exists
    if (!permission) {
        return (
            <View style={styles.centered}>
                <Text style={{color: theme.text}}>Requesting camera permission</Text>
            </View>
        );
    }

    // If the user has not yet granted permissions
    if (!permission.granted) {
        return (
            <View style={styles.centered}>
                <Text style={[styles.message, {color: theme.text}]}>We need your permission to show the camera</Text>
                <CustomButton
                    title={"Grant permission"}
                    onPress={requestPermission}
                />
                <CustomButton
                    title={"Enter manually instead"}
                    variant={"text"}
                    onPress={onSwitchToManual}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        gap: 16,
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
    },
});