import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {useTheme} from "@/src/context/ModeContext";
import {Ionicons} from "@expo/vector-icons";

interface NavigationCardProps {
    title: string;
    subtitle?: string;
    isRead?: boolean;
    iconName?: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function NavigationCard({title, subtitle, isRead, iconName, onPress, style}: NavigationCardProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                styles.cardContainer,
                {
                    backgroundColor: theme.surfaceElevated,
                    borderColor: theme.border,
                },
                style
            ]}
            onPress={onPress}
        >
            <View style={styles.leftSection}>
                {/* Optional icon */}
                {iconName && (
                    <View style={[styles.iconBox, {backgroundColor: theme.surface}]}>
                        <Ionicons name={iconName} size={20} color={theme.tint} />
                    </View>
                )}

                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text
                            style={[
                                styles.title,
                                { color: theme.text }
                            ]}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        {/* Dot for unread notifications */}
                        {isRead === false && <View style={styles.unreadDot}/>}
                    </View>

                    {/* Optional subtitle */}
                    {subtitle && (
                        <Text
                            style={[styles.subtitle, {color: theme.muted}]}
                            numberOfLines={1}
                        >
                            {subtitle}
                        </Text>
                    )}
                </View>
            </View>

            {/* Chevron icon */}
            <View style={styles.chevronIcon}>
                <Ionicons name="chevron-forward" size={20} color={theme.muted} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 13,
        marginTop: 2,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ef4444',
    },
    chevronIcon: {
        paddingLeft: 4,
    },
});