import {useTheme} from "@/src/context/ModeContext";
import {CameraView, useCameraPermissions} from "expo-camera";
import {Alert, StyleSheet, Text, View} from "react-native";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {DeviceCredentialsRequest} from "@/src/api/dto/request/DeviceCredentialsRequest";
import {Ionicons} from "@expo/vector-icons";

interface DeviceScannerProps {
    onScan: (data: DeviceCredentialsRequest) => void;
    onSwitchToManual: () => void;
    onCancel: () => void;
}

export default function DeviceScanner({onScan, onSwitchToManual, onCancel}: DeviceScannerProps) {
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

    const handleScanned = ({data}: {data: string}) => {
        try {
            // Convert QR text to JSON
            const parsed = JSON.parse(data);

            if (parsed.macAddress && parsed.deviceSecret)
                onScan({
                    macAddress: parsed.macAddress,
                    deviceSecret: parsed.deviceSecret
                });
        } catch (error) {
            Alert.alert(
                "Invalid QR code format",
                "Please scan a valid device QR code"
            );
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                onBarcodeScanned={handleScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            >
                <View style={styles.overlay}>

                    {/* Cancel button */}
                    <View style={styles.header}>
                        <Ionicons name={"close"} size={36} color={theme.text} onPress={onCancel} />
                    </View>

                    <View style={styles.scanFrame}/>
                    <Text style={styles.scanText}>Scan the QR code on your device</Text>
                    <CustomButton
                        title="Cannot scan? Enter manually"
                        variant="text"
                        onPress={onSwitchToManual}
                    />
                </View>
            </CameraView>
        </View>
    );
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
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    header: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: 'transparent',
        marginBottom: 24,
        borderRadius: 16
    },
    scanText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 40,
        fontWeight: '600'
    },
});