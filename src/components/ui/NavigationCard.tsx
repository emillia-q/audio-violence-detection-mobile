import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {useTheme} from "@/src/context/ModeContext";

interface NavigationCardProps {
    title: string;
    subtitle?: string;
    isRead?: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function NavigationCard({title, subtitle, isRead, onPress, style}: NavigationCardProps) {
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
            </View>

            <Text
                style={[
                    styles.chevronIcon,
                    {
                        color: theme.muted
                    }
                ]}
            >
                ›
            </Text>
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
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ef4444',
    },
    chevronIcon: {
        fontSize: 24,
        paddingLeft: 8,
    },
});