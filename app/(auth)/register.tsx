import {useState} from "react";
import {KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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

            <Text style={[styles.title, {color: activeColors.text}]}>
                Registration
            </Text>

            {/* Inputs */}
            {/* First & last name */}
            <Text style={[styles.text, {color: activeColors.text}]}>
                First name
            </Text>
            <CustomInput
                style={[styles.input]}
                placeholder={"e.g. Anna"}
                placeholderTextColor={activeColors.placeholder}
                value={firstName}
                onChangeText={setFirstName}
            />
            <Text style={[styles.text, {color: activeColors.text}]}>
                Last name
            </Text>
            <CustomInput
                style={[styles.input]}
                placeholder={"e.g. Nowak"}
                placeholderTextColor={activeColors.placeholder}
                value={lastName}
                onChangeText={setLastName}
            />
            {/* E-mail */}
            <Text style={[styles.text, {color: activeColors.text}]}>
                E-mail
            </Text>
            <CustomInput
                style={[styles.input]}
                placeholder={"e.g. anna@example.com"}
                placeholderTextColor={activeColors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
            />
            {/* Password */}
            <Text style={[styles.text, {color: activeColors.text}]}>
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
            <CustomInput
                style={[styles.input]}
                placeholder={"Confirm password"}
                placeholderTextColor={activeColors.placeholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            {/* Register btn */}
            <CustomButton
                style={styles.registerButton}
                title={"Register"}
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
        </KeyboardAvoidingView>
    );
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
    text: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 6,
    },
    input: {
        marginBottom: 12,
    },
    registerButton: {
        marginTop: 15,
        marginBottom: 20,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});