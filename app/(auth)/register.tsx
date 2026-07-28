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

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Shared theme
    const activeColors = Colors.default;

    const handleRegister = () => {
        if (password != confirmPassword) {
            console.log("Error: passwords are different")
            return
        }
        console.log("Data: ", {firstName, lastName, email, password})
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
                <Text style={[styles.title, {color: activeColors.text}]}>
                    Create Account
                </Text>

                {/* Inputs */}
                {/* First & last name */}
                <Text style={[styles.label, {color: activeColors.placeholder}]}>
                    First name
                </Text>
                <CustomInput
                    style={[styles.input]}
                    placeholder={"e.g. Anna"}
                    placeholderTextColor={activeColors.placeholder}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <Text style={[styles.label, {color: activeColors.placeholder}]}>
                    Last name
                </Text>
                <CustomInput
                    style={[styles.inputGroup]}
                    placeholder={"e.g. Nowak"}
                    placeholderTextColor={activeColors.placeholder}
                    value={lastName}
                    onChangeText={setLastName}
                />
                {/* E-mail */}
                <Text style={[styles.label, {color: activeColors.placeholder}]}>
                    E-mail
                </Text>
                <CustomInput
                    style={[styles.inputGroup]}
                    placeholder={"e.g. anna@example.com"}
                    placeholderTextColor={activeColors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                />
                {/* Password */}
                <Text style={[styles.label, {color: activeColors.placeholder}]}>
                    Password
                </Text>
                <CustomInput
                    style={[styles.input]}
                    placeholder={"Password"}
                    placeholderTextColor={activeColors.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text style={[styles.label, {color: activeColors.placeholder}]}>
                    Confirm password
                </Text>
                <CustomInput
                    style={[styles.input]}
                    placeholder={"Repeat your password"}
                    placeholderTextColor={activeColors.placeholder}
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
                    <Text style={{color: activeColors.text}}>
                        Already have an account?{" "}
                    </Text>
                    <Link asChild href={"/login"} replace>
                        <TouchableOpacity>
                            <Text style={[styles.loginText, {color: activeColors.link}]}>
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
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
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
    loginText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});