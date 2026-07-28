import {StyleSheet, TextInput, TextInputProps} from "react-native";
import {Colors} from "@/src/constants/theme";

interface CustomInputProps extends TextInputProps {}

export function CustomInput({style, ...rest}: CustomInputProps) {
    const activeColors = Colors.default;

    return (
        <TextInput
            {...rest}
            placeholderTextColor={activeColors.placeholder}
            style={[
                styles.input,
                {
                    color: activeColors.text,
                    borderColor: activeColors.border,
                    backgroundColor: 'rgba(255,255,255,0.05)'
                },
                style
            ]}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
    }
})