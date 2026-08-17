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
import AboveInputLabel from "@/src/components/ui/AboveInputLabel";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const registerSchema = z.object({
    firstName: z.string()
        .min(2, "First name must be between 2 and 100 characters")
        .max(100, "First name must be between 2 and 100 characters")
        .regex(/^[\p{L} \-']+$/u, "First name can only contain letters, spaces, hyphens and apostrophes"),
    lastName: z.string()
        .min(2, "Last name must be between 2 and 100 characters")
        .max(100, "Last name must be between 2 and 100 characters")
        .regex(/^[\p{L} \-']+$/u, "Last name can only contain letters, spaces, hyphens and apostrophes"),
    email: z.string()
        .min(1, "E-mail is required")
        .email("Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(60, "Password cannot be longer than 60 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
    const {login} = useAuth();

    const {control, handleSubmit, reset, formState: {isValid}} = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched",
        defaultValues: {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""}
    });

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
                <AboveInputLabel title={"First name"}/>
                <CustomInput
                    style={[styles.input]}
                    placeholder={"e.g. Anna"}
                    placeholderTextColor={Colors.default.placeholder}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <AboveInputLabel title={"Last name"}/>
                <CustomInput
                    style={[styles.inputGroup]}
                    placeholder={"e.g. Nowak"}
                    placeholderTextColor={Colors.default.placeholder}
                    value={lastName}
                    onChangeText={setLastName}
                />
                {/* E-mail */}
                <AboveInputLabel title={"E-mail"}/>
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
                <AboveInputLabel title={"Password"}/>
                <CustomInput
                    style={[styles.input]}
                    placeholder={"Password"}
                    placeholderTextColor={Colors.default.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <AboveInputLabel title={"Confirm password"}/>
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