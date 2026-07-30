import {useState} from "react";
import {
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
    StatusBar, ScrollView
} from "react-native";
import {Colors} from "@/src/constants/theme";
import {Link} from "expo-router";
import {CustomInput} from "@/src/components/ui/CustomInput";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {authService} from "@/src/api/service/auth";
import {useAuth} from "@/src/context/AuthContext";

export default function Login() {
    const {login} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Shared theme
    const activeColors = Colors.default;

    const handleLogin = async () => {
        try {
            const response = await authService.login({email, password});

            // Pass token from backend to context
            await login(response.token);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, {backgroundColor: activeColors.background}]}>

            <StatusBar barStyle="light-content" backgroundColor={activeColors.background} />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerContainer}>
                    <Text style={[styles.title, {color: activeColors.text}]}>
                        Audio Detection System
                    </Text>
                    <Text style={[styles.subtitle, {color: activeColors.muted}]}>
                        Authenticate to access the audio monitoring system.
                    </Text>
                </View>

                {/* Inputs */}
                <Text style={[styles.label, {color: activeColors.muted}]}>
                    E-mail
                </Text>
                <CustomInput
                    style={styles.inputGroup}
                    placeholder={"e.g. anna@example.com"}
                    placeholderTextColor={activeColors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                />
                <Text style={[styles.label, {color: activeColors.muted}]}>
                    Password
                </Text>
                <CustomInput
                    style={styles.input}
                    placeholder={"Enter your password"}
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
                    <Text style={{color: activeColors.muted}}>
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
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingTop: 40,
        paddingBottom: 60,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 4,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    input: {
        marginBottom: 12,
    },
    inputGroup: {
        marginBottom: 24,
    },
    loginButton: {
        marginTop: 20,
        marginBottom: 30,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    registerText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});