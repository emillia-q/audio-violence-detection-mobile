import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import {useMode} from "@/src/context/ModeContext";

export default function ModeSwitcher() {
    const {mode, setMode} = useMode();
    const isUserMode = mode === 'user';

    return (
        <View style={styles.container}>
            <View style={styles.switcherTrack}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.tab,
                        isUserMode && {backgroundColor: Colors.user.primaryButton}
                    ]}
                    onPress={() => setMode('user')}
                >
                    <Text style={[styles.tabText, isUserMode ? styles.activeText : styles.inactiveText]}>
                        My safety
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: Colors.default.background,
    },
    switcherTrack: {
        flexDirection: 'row',
        backgroundColor: Colors.default.surface,
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    activeText: {
        color: '#FFFFFF',
    },
    inactiveText: {
        color: Colors.default.muted,
    },
});