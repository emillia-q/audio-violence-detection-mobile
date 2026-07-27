import {useState} from "react";
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    useColorScheme,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity
} from "react-native";
import {Colors} from "@/src/constants/theme";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Get phone theme
    const theme = useColorScheme() ?? 'light';
    // Get appropriate color package
    const activeColors = Colors[theme];

    const handleLogin = () => {
        // TODO: call backend
        console.log("Data: ", {email, password});
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, {backgroundColor: activeColors.background}]}>
            <Text style={[styles.title, {color: activeColors.text}]}>
                Audio Violence Detection</Text>

            {/* Inputs */}
            <TextInput
                style={[styles.input, {color: activeColors.text, borderColor: activeColors.border}]}
                placeholder={"E-mail"}
                placeholderTextColor={activeColors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
            />
            <TextInput
                style={[styles.input, {color: activeColors.text, borderColor: activeColors.border}]}
                placeholder={"Password"}
                placeholderTextColor={activeColors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Log in btn */}
            <TouchableOpacity
                style={[styles.loginButton]}
                onPress={handleLogin}
            >
                <Text
                    style={[styles.loginButtonText]}
                >
                    Log in
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    loginButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});