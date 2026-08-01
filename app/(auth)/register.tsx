import {useState} from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Colors} from "@/src/constants/theme";
import {CustomInput} from "@/src/components/ui/CustomInput";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {Link} from "expo-router";
import {authService} from "@/src/api/service/auth";
import {useAuth} from "@/src/context/AuthContext";

export default function Register() {
    const {login} = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password != confirmPassword) {
            console.log("Error: passwords are different")
            return
        }

        try {
            const response = await authService.register({
                firstName,
                lastName,
                email,
                password
            });

            // Pass token from backend to context -> log in immediately upon registration
            await login(response.token);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor={Colors.default.background} />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>
                    Create Account
                </Text>

                {/* Inputs */}
                {/* First & last name */}
                <Text style={styles.label}>
                    First name
                </Text>
                <CustomInput
                    style={[styles.input]}
                    placeholder={"e.g. Anna"}
                    placeholderTextColor={Colors.default.placeholder}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <Text style={styles.label}>
                    Last name
                </Text>
                <CustomInput
                    style={[styles.inputGroup]}
                    placeholder={"e.g. Nowak"}
                    placeholderTextColor={Colors.default.placeholder}
                    value={lastName}
                    onChangeText={setLastName}
                />
                {/* E-mail */}
                <Text style={styles.label}>
                    E-mail
                </Text>
                <CustomInput
                    style={[styles.inputGroup]}
                    placeholder={"e.g. anna@example.com"}
                    placeholderTextColor={Colors.default.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                />
                {/* Password */}
                <Text style={styles.label}>
                    Password
                </Text>
                <CustomInput
                    style={[styles.input]}
                    placeholder={"Password"}
                    placeholderTextColor={Colors.default.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text style={styles.label}>
                    Confirm password
                </Text>
                <CustomInput
                    style={[styles.input]}
                    placeholder={"Repeat your password"}
                    placeholderTextColor={Colors.default.placeholder}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                {/* Register btn */}
                <CustomButton
                    style={styles.registerButton}
                    title={"Sign up"}
                    onPress={handleRegister}
                />

                {/* Log in when already have account */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginPrompt}>
                        Already have an account?{" "}
                    </Text>
                    <Link asChild href={"/login"} replace>
                        <TouchableOpacity>
                            <Text style={styles.loginText}>
                                Log in
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.background,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingTop: 40,
        paddingBottom: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 35,
        letterSpacing: 0.5,
        color: Colors.default.text,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: Colors.default.muted,
    },
    input: {
        marginBottom: 12,
    },
    inputGroup: {
      marginBottom: 24,
    },
    registerButton: {
        marginTop: 15,
        marginBottom: 20,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    loginPrompt: {
        color: Colors.default.muted,
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.default.link,
    }
});