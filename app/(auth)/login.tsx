import {useState} from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO: call backend
        console.log("Data: ", {email, password});
    }

}