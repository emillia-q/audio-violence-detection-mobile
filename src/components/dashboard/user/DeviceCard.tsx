import {StyleSheet, TouchableOpacity} from 'react-native'
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

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
   cardContainer: {
       flexDirection: 'row',
       backgroundColor: Colors.default.surface,
       borderColor: Colors.default.border,

   },
});