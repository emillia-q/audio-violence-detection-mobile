import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import {Stack, useRouter, useSegments} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {AuthProvider, useAuth} from "@/src/context/AuthContext";
import {useEffect, useMemo} from "react";
import {ModeProvider, useTheme} from "@/src/context/ModeContext";
import Toast from "react-native-toast-message";

function RootLayoutNav() {
    const {token, loading} = useAuth();
    const theme = useTheme();
    const navigationTheme = useMemo(() => ({
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            background: theme.background,
            card: theme.background,
            text: theme.text,
            border: theme.border,
        },
    }), [theme]); // Only when theme has changed

    // Init expo router tools
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (loading)
            return;

        // Check if the user is at login section
        const inAuthGroup = segments[0] === '(auth)';

        // If user has token -> redirect to his home screen and if not redirect to login screen
        if (!token && !inAuthGroup)
            router.replace('/(auth)/login');
        else if (token && inAuthGroup)
            router.replace('/(main)');
    }, [token, loading, segments]);

    return (
        <ThemeProvider value={navigationTheme}>
            <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="light" />
        </ThemeProvider>
    );
}

export default function RootLayout() {
    return (
        <>
            <AuthProvider>
                <ModeProvider>
                    <RootLayoutNav/>
                </ModeProvider>
            </AuthProvider>
            <Toast/>
        </>
    );
}