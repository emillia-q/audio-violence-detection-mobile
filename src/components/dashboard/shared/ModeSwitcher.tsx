import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import {useMode, useTheme} from "@/src/context/ModeContext";

export default function ModeSwitcher() {
    const {mode, setMode} = useMode();
    const theme = useTheme();
    const isUserMode = mode === 'user';

    return (
        <View style={styles.container}>
            <View style={[styles.switcherTrack, {backgroundColor: theme.surface}]}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.tab,
                        isUserMode && {backgroundColor: Colors.user.primaryButton}
                    ]}
                    onPress={() => setMode('user')}
                >
                    <Text style={[
                        styles.tabText,
                        {color: isUserMode ? Colors.user.textActive : theme.textInactive}]}
                    >
                        My safety
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.tab,
                        !isUserMode && {backgroundColor: Colors.trustedUser.primaryButton}
                    ]}
                    onPress={() => setMode('trustedUser')}
                >
                    <Text style={[
                        styles.tabText,
                        {color: !isUserMode ? Colors.trustedUser.textActive : theme.textInactive}]}
                    >
                        Superman
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    switcherTrack: {
        flexDirection: 'row',
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
});
