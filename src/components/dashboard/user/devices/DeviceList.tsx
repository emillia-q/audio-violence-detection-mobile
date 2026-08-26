import {StyleSheet, View} from "react-native";
import {DeviceListResponse} from "@/src/api/dto/response/DeviceListResponse";
import NavigationCard from "@/src/components/ui/NavigationCard";
import EmptyListView from "@/src/components/ui/EmptyListView";

interface DeviceListProps {
    devices: DeviceListResponse[];
    onAddDevice: () => void;
    onDevicePress: (id: number) => void;
}

export default function DeviceList({devices, onAddDevice, onDevicePress}: DeviceListProps) {
    // 204 - empty list
    if (devices.length === 0) {
        return (
            <EmptyListView
                title={'No devices'}
                iconName={"hardware-chip-outline"}
                buttonTitle={"+ Add device"}
                onButtonPress={onAddDevice}
            />
        );
    }

    // 200 - list of devices
    return (
        <View style={styles.listContainer}>
            {devices.map((device) => (
                <NavigationCard
                    key={device.id}
                    title={device.name}
                    onPress={() => onDevicePress(device.id)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    },
});
