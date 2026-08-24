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
                    {SETUP_STEPS.map((step, index) => (
                        <View key={index} style={styles.stepRow}>
                            <Text style={[styles.stepNumber, {color: theme.text}]}>
                                {index+1}.
                            </Text>
                            <Text style={[styles.stepText, {color: theme.text}]}>
                                {step}
                            </Text>
                        </View>
                    ))}
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
    stepRow: {
        flexDirection: 'row',
        alignItems: "flex-start",
    },
    stepNumber: {
        fontSize: 16,
        fontWeight: '700',
        width: 24,
        marginTop: 2,
    },
    stepText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        flex: 1, // Text takes remaining place
    },
});