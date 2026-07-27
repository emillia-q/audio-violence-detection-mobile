import {useState} from "react";
import {
    Text,
    TextInput,
    StyleSheet,
    useColorScheme,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
    StatusBar
} from "react-native";
import {Colors} from "@/src/constants/theme";
import {Link} from "expo-router";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Shared theme
    const activeColors = Colors.default;

    const handleLogin = () => {
        // TODO: call backend
        console.log("Data: ", {email, password});
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, {backgroundColor: activeColors.background}]}>

            <StatusBar barStyle="light-content" backgroundColor={activeColors.background} />

            <Text style={[styles.title, {color: activeColors.text}]}>
                Audio Violence Detection
            </Text>

            {/* Inputs */}
            <TextInput
                style={[styles.input, {
                    color: activeColors.text,
                    borderColor: activeColors.border,
                    backgroundColor: 'rgba(255,255,255,0.05)'
                }]}
                placeholder={"E-mail"}
                placeholderTextColor={activeColors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
            />
            <TextInput
                style={[styles.input, {
                    color: activeColors.text,
                    borderColor: activeColors.border,
                    backgroundColor: 'rgba(255,255,255,0.05)'
                }]}
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
        padding: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 40,
        letterSpacing: 1,
    },
    input: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    loginButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});