import {useState} from "react";

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (password != confirmPassword) {
            console.log("Error: passwords are different")
            return
        }
        console.log("Data: ", {firstName, lastName, email, password})
    }

    return (

    );
}