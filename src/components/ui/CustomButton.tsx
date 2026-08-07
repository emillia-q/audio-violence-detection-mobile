import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {useTheme} from "@/src/context/ModeContext";

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
}

export function CustomButton({style, title, ...rest}: CustomButtonProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.85} // Smoother click
            {...rest}
            style={[
                styles.button,
                {
                    backgroundColor: theme.primaryButton,
                    shadowColor: theme.primaryButton, // Better than black on a dark bg
                },
                style
            ]}
        >
            <Text style={[styles.text, {color: theme.primaryButtonText}]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    text: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    }
})
