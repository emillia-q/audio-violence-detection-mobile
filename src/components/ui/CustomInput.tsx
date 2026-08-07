import {StyleSheet, TextInput, TextInputProps, TouchableOpacity, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";

interface CustomInputProps extends TextInputProps {}

export function CustomInput({style, secureTextEntry, onFocus, onBlur,  ...rest}: CustomInputProps) {
    const activeColors = Colors.default;

    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // If field is set as password add eye icon
    const isPasswordField = secureTextEntry !== undefined;

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
                    {color: activeColors.text}
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
                        color={activeColors.placeholder}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
})
