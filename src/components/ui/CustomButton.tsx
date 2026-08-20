import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {useTheme} from "@/src/context/ModeContext";

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'solid' | 'outline' | 'text';
    isDanger?: boolean;
}

export function CustomButton({style, title, variant = 'solid', isDanger = false,  ...rest}: CustomButtonProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.85} // Smoother click
            {...rest}
            style={[
                styles.baseButton,
                // solid
                variant === 'solid' && {
                    backgroundColor: isDanger ? theme.danger : theme.primaryButton,
                    shadowColor: isDanger ? theme.danger : theme.primaryButton,
                    elevation: 4,
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                },

                // outline
                variant === 'outline' && {
                    backgroundColor: 'transparent',
                    borderWidth: 1.5,
                    borderColor: isDanger ? theme.danger : theme.tint,
                },

                // text
                variant === 'text' && {
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                },
                style
            ]}
        >
            <Text style={[
                styles.text,
                {color: variant === 'solid' ? theme.primaryButtonText : (isDanger ? theme.danger : theme.tint)}
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    baseButton: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    }
})
