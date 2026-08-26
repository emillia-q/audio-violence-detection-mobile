import {StyleSheet, Text, View} from "react-native";
import {useTheme} from "@/src/context/ModeContext";

type StatusType = 'online' | 'offline' | 'danger' | 'warning';

interface StatusBadgeProps {
    status: StatusType;
    text: string;
}

export default function StatusBadge({status, text}: StatusBadgeProps) {
    const theme = useTheme();

    // Defined once to avoid memory overhead
    const STATUS_COLORS: Record<StatusType, string> = {
        online: theme.success,
        offline: theme.disabled,
        danger: theme.danger,
        warning: theme.warning,
    };

    // Set color based on status
    const color = STATUS_COLORS[status] ?? STATUS_COLORS.offline;

    return (
        <View style={styles.badgeContainer}>
            {/* Status dot */}
            <View style={[styles.dot, {backgroundColor: color}]}/>

            {/* Status text */}
            <Text style={[styles.badgeText, {color: color}]}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 999,
        alignSelf: 'flex-start',
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
});
