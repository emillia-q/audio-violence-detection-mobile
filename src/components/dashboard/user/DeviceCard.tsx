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
       alignItems: 'center',
       justifyContent: 'space-between',
       backgroundColor: Colors.default.surface,
       borderColor: Colors.default.border,
       borderWidth: 1,
       borderRadius: 16,
       padding: 16,
       marginBottom: 12,
   },
});