import {StyleSheet, TouchableOpacityProps} from "react-native";
import {Colors} from "@/src/constants/theme";

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
}

export function CustomButton({style, title, ...rest}: CustomButtonProps) {
    const activeColors = Colors.default;

    return (

    );
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    }
})