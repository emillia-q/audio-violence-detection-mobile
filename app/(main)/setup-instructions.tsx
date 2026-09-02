import {useLocalSearchParams, useRouter} from "expo-router";
import {useTheme} from "@/src/context/ModeContext";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, Text, View} from "react-native";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {Ionicons} from "@expo/vector-icons";

const SETUP_STEPS = [
    "Turn on your audio device.",
    "Open phone settings and connect to the device's Wi-Fi network.",
    "A setup page will open automatically.",
    "Enter your home Wi-Fi details.",
    "The device will restart and activate."
];

export default function SetupInstructionsScreen() {
    const {macAddress} = useLocalSearchParams();
    const router = useRouter();
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.background}]}>
            <View style={styles.content}>

                {/* Title section */}
                <View style={styles.header}>
                    <View style={[styles.iconWrapper, {
                        backgroundColor: theme.surfaceElevated,
                        borderColor: theme.border,
                        borderWidth: 1
                    }]}>
                        <Ionicons name="wifi-outline" size={32} color={theme.tint}/>
                    </View>
                    <Text style={[styles.title, {color: theme.text}]}>Setup Instructions</Text>
                </View>

                {/* Subtitle */}
                <Text style={[styles.subtitle, {color: theme.muted}]}>
                    Follow the steps below to connect device ({macAddress}) to your local network and complete the
                    activation process.
                </Text>

                {/* Next steps */}
                <View style={[styles.card, {backgroundColor: theme.surface, borderColor: theme.border}]}>
                    {SETUP_STEPS.map((step, index) => (
                        <View key={index} style={styles.stepRow}>
                            <Text style={[styles.stepNumber, {color: theme.text}]}>
                                {index + 1}.
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
    header: {
        marginBottom: 16,
    },
    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: "flex-start",
    },
    stepNumber: {
        fontSize: 16,
        fontWeight: '900',
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