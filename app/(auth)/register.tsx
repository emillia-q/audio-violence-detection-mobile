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

            {/* Inputs */}
            {/* First & last name */}
            <CustomInput
                style={[styles.input]}
                placeholder={"First name"}
                placeholderTextColor={activeColors.placeholder}
                value={firstName}
                onChangeText={setFirstName}
            />
            <CustomInput
                style={[styles.input]}
                placeholder={"Last name"}
                placeholderTextColor={activeColors.placeholder}
                value={lastName}
                onChangeText={setLastName}
            />
            {/* E-mail */}
            <CustomInput
                style={[styles.input]}
                placeholder={"E-mail"}
                placeholderTextColor={activeColors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
            />
            {/* Password */}
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
                placeholder={"Password"}
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
    input: {
        marginBottom: 10,
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