import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, Text, View} from "react-native";
import {useRouter} from "expo-router";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {useTheme} from "@/src/context/ModeContext";

export default function AddDeviceScreen() {
    const router = useRouter();
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.background}]}>
            <View style={styles.content}>
                <Text style={[styles.title, {color: theme.text}]}>Add new device</Text>
                <CustomButton
                    title="Back to dashboard"
                    variant="outline"
                    onPress={() => router.back()}
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
        justifyContent: "center",
        padding: 24,
        gap: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
    },
});
