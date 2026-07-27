import {useState} from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO: call backend
        console.log("Data: ", {email, password});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audio Violence Detection</Text>

            {/* Inputs */}
            <TextInput
                style={styles.input}
                placeholder={"E-mail"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize={"none"}
            />
            <TextInput
                style={styles.input}
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
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    }
});