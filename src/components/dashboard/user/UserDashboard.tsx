import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import {useEffect, useState} from "react";
import {DeviceListResponse} from "@/src/api/dto/response/DeviceListResponse";
import {deviceService} from "@/src/api/service/device";
import DeviceList from "@/src/components/dashboard/user/DeviceList";

export default function UserDashboard() {
    const [devices, setDevices] = useState<DeviceListResponse[]>([]);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const data = await deviceService.getUserDevices();
                setDevices(data);
            } catch (error) {
                alert(error);
            }
        };
        fetchDevices();
    }, []);

    return (
        <View style={styles.container}>
            <DeviceList devices={devices}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.user.background,
    },
    title: {
        color: Colors.user.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
});