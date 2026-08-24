import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import {useTheme} from "@/src/context/ModeContext";
import {useState} from "react";
import {deviceService} from "@/src/api/service/device";
import Toast from "react-native-toast-message";
import DeviceScanner from "@/src/components/dashboard/user/devices/DeviceScanner";
import {DeviceCredentialsRequest} from "@/src/api/dto/request/DeviceCredentialsRequest";
import ManualDeviceForm from "@/src/components/dashboard/user/devices/ManualDeviceForm";

export default function AddDeviceScreen() {
    const router = useRouter();
    const theme = useTheme();

    const [isPairing, setIsPairing] = useState(false);
    const [isManualMode, setIsManualMode] = useState(false);

    const handlePairDevice = async (data: DeviceCredentialsRequest) => {
        // Double scan protection
        if (isPairing)
            return;

        setIsPairing(true);

        try {
            const response = await deviceService.pairDevice(data);

            Toast.show({
                type: 'success',
                text1: 'Device paired successfully'
            });

            // Display next setup info
            router.replace({
                pathname: '/setup-instructions',
                params: {
                    macAddress: response.macAddress
                }
            });
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 404) {
                Toast.show({
                    type: 'error',
                    text1: 'Device not found',
                    text2: 'Invalid MAC Address'
                });
            } else if (status === 400) {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid device credentials'
                });
            } else if (status === 409) {
                Toast.show({
                    type: 'error',
                    text1: 'Device is already assigned to a user'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to pair device'
                });
            }
        } finally {
            setIsPairing(false);
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.background}]}>
            {isManualMode ? (
                <ManualDeviceForm
                    onSubmit={handlePairDevice}
                    onSwitchToScanner={() => setIsManualMode(false)}
                />
            ) : (
                <DeviceScanner
                    onScan={handlePairDevice}
                    onSwitchToManual={() => setIsManualMode(true)}
                    onCancel={() => router.back()}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        gap: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
    },
});
