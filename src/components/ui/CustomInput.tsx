import {StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@/src/context/ModeContext";

interface CustomInputProps extends TextInputProps {
    errorMessage?: string; // Receives validation errors
}

export function CustomInput({style, secureTextEntry, onFocus, onBlur, errorMessage,  ...rest}: CustomInputProps) {
    const theme = useTheme()

    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // If field is set as password add eye icon
    const isPasswordField = secureTextEntry !== undefined;

    const borderColor = errorMessage ? theme.danger : (isFocused ? theme.tint : theme.border)

    return (
        <View style={styles.wrapper}>
            <View style={[
                styles.container,
                {
                    backgroundColor: theme.surface,
                    borderColor: borderColor,
                },
                style
            ]}>
                <TextInput
                    {...rest}
                    placeholderTextColor={theme.placeholder}

                    // Password uncover
                    secureTextEntry={isPasswordField && !isPasswordVisible}

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
                        {color: theme.text}
                    ]}
                />

                {/* Password eye */}
                {isPasswordField && (
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Ionicons
                            name={isPasswordVisible ? "eye-off" : "eye"}
                            size={22}
                            color={theme.placeholder}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Error message below the input */}
            {errorMessage && (
                <Text style={[
                    styles.errorText,
                    {
                        color: theme.danger
                    }
                ]}
                >
                    {errorMessage}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 14,
        overflow: 'hidden', // Bg not stick out beyond corners
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    iconContainer: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
        fontWeight: '600',
    }
})
