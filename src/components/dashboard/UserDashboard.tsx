import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/src/constants/theme";

export default function UserDashboard() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My safety</Text>
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