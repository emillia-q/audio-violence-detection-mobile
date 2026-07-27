import {useState} from "react";
import {
    Text,
    TextInput,
    StyleSheet,
    useColorScheme,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity, View
} from "react-native";
import {Colors} from "@/src/constants/theme";
import {Link} from "expo-router";

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
                style={[styles.loginButton, {backgroundColor: activeColors.primaryButton}]}
                onPress={handleLogin}
            >
                <Text style={[styles.loginButtonText, {color: activeColors.primaryButtonText}]}>
                    Log in
                </Text>
            </TouchableOpacity>

            {/* Sign in when have no account */}
            <View style={styles.registerContainer}>
                <Text style={{color: activeColors.text}}>
                    Don't have an account?{" "}
                </Text>
                <Link asChild href={"/register"} replace>
                    <TouchableOpacity>
                        <Text style={[styles.registerText, {color: activeColors.link}]}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </Link>
            </View>
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
        marginTop: 10,
        marginBottom: 10,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerText: {
        fontWeight: 'bold',
    }
});