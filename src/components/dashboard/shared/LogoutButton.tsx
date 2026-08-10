import {useTheme} from "@/src/context/ModeContext";
import {Alert} from "react-native";

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
        )
    }
}