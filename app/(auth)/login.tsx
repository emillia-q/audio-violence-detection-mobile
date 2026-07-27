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
            />
        </View>
    )
}