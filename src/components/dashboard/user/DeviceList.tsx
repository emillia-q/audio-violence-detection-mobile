import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import DeviceCard from "@/src/components/dashboard/user/DeviceCard";

interface Device {
    id: number;
    name: string;
}

interface DeviceListProps {
    devices: Device[];
}

export default function DeviceList({devices}: DeviceListProps) {
    // 204 - empty list
    if (devices.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No devices</Text>
            </View>
        );
    }

    // 200 - list of devices
    return (
        <View style={styles.listContainer}>
            {devices.map((device) => (
                <DeviceCard
                    key={device.id}
                    id={device.id}
                    name={device.name}
                    onPress={() => console.log("jeszcze nic nie robie")}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: Colors.default.surface,
        borderColor: Colors.default.border,
        borderWidth: 1,
        borderRadius: 16,
        borderStyle: 'dashed',
    },
    emptyTitle: {
        color: Colors.default.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContainer: {
        width: '100%',
    },
});