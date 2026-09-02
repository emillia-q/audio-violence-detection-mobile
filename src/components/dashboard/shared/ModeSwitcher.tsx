import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import {useMode, useTheme} from "@/src/context/ModeContext";
import {Ionicons} from "@expo/vector-icons";

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
                    <View style={styles.tabContent}>
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={18}
                            color={isUserMode ? Colors.user.textActive : theme.textInactive}
                        />
                        <Text style={[
                            styles.tabText,
                            {color: isUserMode ? Colors.user.textActive : theme.textInactive}]}
                        >
                            My Safety
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.tab,
                        !isUserMode && {backgroundColor: Colors.trustedUser.primaryButton}
                    ]}
                    onPress={() => setMode('trustedUser')}
                >
                    <View style={styles.tabContent}>
                        <Ionicons
                            name="people-outline"
                            size={18}
                            color={!isUserMode ? Colors.trustedUser.textActive : theme.textInactive}
                        />
                        <Text style={[
                            styles.tabText,
                            {color: !isUserMode ? Colors.trustedUser.textActive : theme.textInactive}]}
                        >
                            My Network
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
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
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
});
