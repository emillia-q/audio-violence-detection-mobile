import {useLocalSearchParams, useRouter} from "expo-router";
import {useTheme} from "@/src/context/ModeContext";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, Text, View} from "react-native";
import {CustomButton} from "@/src/components/ui/CustomButton";

const SETUP_STEPS = [
    "Turn on your audio device.",
    "Open phone settings and connect to the device's Wi-Fi network.",
    "A setup page will open automatically.",
    "Enter your home Wi-Fi details.",
    "The device will restart and activate."
];

export default function SetupInstructionsScreen() {
    const {id, macAddress} = useLocalSearchParams();
    const router = useRouter();
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.background}]}>
            <View style={styles.content}>
                <Text style={[styles.title, {color: theme.text}]}>Next Steps</Text>
                <Text style={[styles.subtitle, {color: theme.muted}]}>
                    Device ({macAddress}) is paired to your account. Follow these steps to activate it:
                </Text>

                {/* Next steps */}
                <View style={[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}]}>
                    <Text style={[styles.step, {color: theme.text}]}>1. Turn on your audio device.</Text>
                    <Text style={[styles.step, {color: theme.text}]}>2. Open phone settings and connect to the device's Wi-Fi network.</Text>
                    <Text style={[styles.step, {color: theme.text}]}>3. A setup page will open automatically.</Text>
                    <Text style={[styles.step, {color: theme.text}]}>4. Enter your home Wi-Fi details.</Text>
                    <Text style={[styles.step, {color: theme.text}]}>5. The device will restart and activate.</Text>
                </View>

                {/* Button */}
                <CustomButton
                    title={"Finish Setup"}
                    onPress={() => router.replace('/')}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 32,
    },
    card: {
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        gap: 16,
        marginBottom: 32,
    },
    step: {
        fontSize: 16,
        fontWeight: '500',
    },
});