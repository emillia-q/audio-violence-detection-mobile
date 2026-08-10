import {useTheme} from "@/src/context/ModeContext";
import {Alert, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

interface LogoutButtonProps {
    onLogout: () => void;
}

export default function LogoutButton({onLogout}: LogoutButtonProps) {
    const theme = useTheme();

    const handlePress = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    style: "destructive",
                    onPress: onLogout
                }
            ]
        );
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={styles.container}
            activeOpacity={0.7}
        >
            <Ionicons name={"log-out-outline"} size={32} color={theme.text}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
   container: {
       padding: 8,
   },
});