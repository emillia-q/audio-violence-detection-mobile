import {useState} from "react";
import {
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
    StatusBar
} from "react-native";
import {Colors} from "@/src/constants/theme";
import {Link} from "expo-router";
import {CustomInput} from "@/src/components/ui/CustomInput";
import {CustomButton} from "@/src/components/ui/CustomButton";

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
            <CustomInput
                style={styles.input}
                placeholder={"E-mail"}
                placeholderTextColor={activeColors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
            />
            <CustomInput
                style={styles.input}
                placeholder={"Password"}
                placeholderTextColor={activeColors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Log in btn */}
            <CustomButton
                style={styles.loginButton}
                title={"Log in"}
                onPress={handleLogin}
            />

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
        marginBottom: 15,
    },
    loginButton: {
        marginTop: 15,
        marginBottom: 20,
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