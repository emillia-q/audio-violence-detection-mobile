import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/src/constants/theme";

export default function TrustedUserDashboard() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Superman</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.trustedUser.background,
    },
    title: {
        color: Colors.trustedUser.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
});