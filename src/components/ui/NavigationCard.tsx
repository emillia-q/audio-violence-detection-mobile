import {StyleSheet} from "react-native";
import {Colors} from "@/src/constants/theme";


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