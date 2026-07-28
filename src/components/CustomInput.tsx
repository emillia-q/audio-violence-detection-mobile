import {StyleSheet, TextInput, TextInputProps} from "react-native";
import {Colors} from "@/src/constants/theme";

interface CustomInputProps extends TextInputProps {}

export function CustomInput(props: CustomInputProps) {
    const activeColors = Colors.default;

    return (
        <TextInput
            style={[
                styles.input,
                {
                    color: activeColors.text,
                    borderColor: activeColors.border,
                    backgroundColor: 'rgba(255,255,255,0.05)'
                },
                props.style // Allows to override
            ]}
            placeholderTextColor={activeColors.placeholder}
            {...props}
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