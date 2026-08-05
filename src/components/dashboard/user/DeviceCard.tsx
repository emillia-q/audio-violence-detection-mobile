import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {Colors} from "@/src/constants/theme";

interface DeviceCardProps {
    id: number;
    name: string;
    onPress: () => void;
}

export default function DeviceCard({name, onPress}: DeviceCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cardContainer}
            onPress={onPress}
        >
            <Text style={styles.deviceName} numberOfLines={1}>
                {name}
            </Text>
            <Text style={styles.chevronIcon}>
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
        backgroundColor: Colors.user.surface,
        borderColor: Colors.user.border,
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    deviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.user.text,
    },
    chevronIcon: {
      fontSize: 24,
      color: Colors.user.muted,
      paddingLeft: 8,
    },
});
