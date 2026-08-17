import {
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
    StatusBar, ScrollView
} from "react-native";
import {Colors} from "@/src/constants/theme";
import {Link} from "expo-router";
import {CustomInput} from "@/src/components/ui/CustomInput";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {authService} from "@/src/api/service/auth";
import {useAuth} from "@/src/context/AuthContext";
import AboveInputLabel from "@/src/components/ui/AboveInputLabel";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z.string()
        .min(1, "E-mail is required")
        .email("Invalid email format"),
    password: z.string()
        .min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const {login} = useAuth();

    const {control, handleSubmit, reset, formState: {isValid}} = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        defaultValues: {email: "", password: ""}
    });

    const onValidSubmit = async (data: LoginFormValues) => {
        try {
            const response = await authService.login({
                email: data.email.trim(),
                password: data.password
            });

            // Pass token from backend to context
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
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>
                        Audio Detection System
                    </Text>
                    <Text style={styles.subtitle}>
                        Authenticate to access the audio monitoring system.
                    </Text>
                </View>

                {/* Inputs */}
                <AboveInputLabel title={"E-mail"}/>
                <Controller
                    control={control}
                    name={"email"}
                    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                        <CustomInput
                            placeholder={"e.g. anna@example.com"}
                            placeholderTextColor={Colors.default.placeholder}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType={"email-address"}
                            autoCapitalize={"none"}
                            errorMessage={error?.message}
                        />
                    )}
                />

                <AboveInputLabel title={"Password"}/>
                <Controller
                    control={control}
                    name={"password"}
                    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                        <CustomInput
                            placeholder={"Enter your password"}
                            placeholderTextColor={Colors.default.placeholder}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                            errorMessage={error?.message}
                        />
                    )}
                />

                {/* Log in btn */}
                <CustomButton
                    style={styles.loginButton}
                    title={"Log in"}
                    onPress={handleSubmit(onValidSubmit)}
                />

                {/* Sign in when have no account */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerPrompt}>
                        Don't have an account?{" "}
                    </Text>
                    <Link asChild href={"/register"} replace>
                        <TouchableOpacity>
                            <Text style={styles.registerText}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
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
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.5,
        color: Colors.default.text,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
        paddingHorizontal: 10,
        color: Colors.default.muted,
    },
    loginButton: {
        marginTop: 20,
        marginBottom: 30,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    registerPrompt: {
        color: Colors.default.muted,
    },
    registerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.default.link,
    }
});