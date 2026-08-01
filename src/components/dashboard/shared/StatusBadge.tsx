import {Colors} from "@/src/constants/theme";
import {StyleSheet, Text, View} from "react-native";

type StatusType = 'online' | 'offline' | 'warning';

interface StatusBadgeProps {
    status: StatusType;
    text: string;
}

export default function StatusBadge({status, text}: StatusBadgeProps) {
    // Set color based on status
    const getStatusColor = () => {
        switch (status) {
            case "online":
                return '#10B981';
            case "offline":
                return '#64748B';
            case "warning":
                return '#EF4444';
            default:
                return Colors.default.muted;
        }
    }

    const color = getStatusColor();

    return (
        <View style={styles.badgeContainer}>
            {/* Status dot */}
            <View style={[styles.dot, {backgroundColor: color}]}/>

            {/* Status text */}
            <Text style={[styles.badgeText, {backgroundColor: color}]}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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