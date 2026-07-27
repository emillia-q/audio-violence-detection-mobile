import {useState} from "react";
import {Text, TextInput, View, StyleSheet, useColorScheme} from "react-native";
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
        <View style={[styles.container, {backgroundColor: activeColors.background}]}>
            <Text style={[styles.title, {color: activeColors.text}]}>
                Audio Violence Detection</Text>

            {/* Inputs */}
            <TextInput
                style={[styles.input, {color: activeColors.text, borderColor: activeColors.icon}]}
                placeholder={"E-mail"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize={"none"}
            />
            <TextInput
                style={[styles.input, {color: activeColors.text, borderColor: activeColors.icon}]}
                placeholder={"Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
        </View>
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
    }
});