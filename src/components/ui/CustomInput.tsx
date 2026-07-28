import {StyleSheet, TextInput, TextInputProps, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import {useState} from "react";

interface CustomInputProps extends TextInputProps {}

export function CustomInput({style, secureTextEntry, onFocus, onBlur,  ...rest}: CustomInputProps) {
    const activeColors = Colors.default;

    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: activeColors.surface,
                borderColor: isFocused ? activeColors.tint : activeColors.border,
            },
            style
        ]}>
            <TextInput
                {...rest}
                placeholderTextColor={activeColors.placeholder}

                // Toggle focus
                onFocus={(e) => {
                    setIsFocused(true);
                    if (onFocus) onFocus(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    if (onBlur) onBlur(e);
                }}
                style={[
                    styles.input,
                    {color: activeColors.text}
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 14,
        overflow: 'hidden',
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 16,
        fontSize: 16,
    }
})