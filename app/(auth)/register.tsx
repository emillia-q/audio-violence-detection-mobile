import {useState} from "react";
import {KeyboardAvoidingView, Platform, StatusBar, StyleSheet} from "react-native";
import {Colors} from "@/src/constants/theme";

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


        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
    },
})