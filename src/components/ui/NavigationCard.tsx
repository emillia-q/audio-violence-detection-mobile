import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {useTheme} from "@/src/context/ModeContext";
import {Ionicons} from "@expo/vector-icons";

interface NavigationCardProps {
    title: string;
    subtitle?: string;
    isRead?: boolean;
    onPress: () => void;
    onMorePress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function NavigationCard({title, subtitle, isRead, onPress, onMorePress, style}: NavigationCardProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                styles.cardContainer,
                {
                    backgroundColor: theme.surface,
                    borderColor: theme.border
                },
                style
            ]}
            onPress={onPress}
        >
            <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: theme.text
                            }
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
                        style={[
                            styles.subtitle,
                            {color: theme.muted}
                        ]}
                        numberOfLines={1}
                    >
                        {subtitle}
                    </Text>
                )}
            </View>

            {onMorePress ? (
                <TouchableOpacity
                    style={styles.moreButton}
                    onPress={onMorePress}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} // Enlarges the click area
                >
                    <Ionicons name={"ellipsis-vertical"} size={20} color={theme.muted}/>
                </TouchableOpacity>
            ) : (
                <View style={styles.chevronIcon}>
                    <Ionicons name="chevron-forward" size={20} color={theme.muted} />
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
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
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 13,
        marginTop: 4,
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ef4444',
    },
    chevronIcon: {
        paddingLeft: 8,
    },
    moreButton: {
        paddingLeft: 16,
        paddingVertical: 4,
    },
});