import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import {Stack, useRouter, useSegments} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Colors } from '@/src/constants/theme';
import {AuthProvider, useAuth} from "@/src/context/AuthContext";
import {useEffect} from "react";

const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: Colors.default.background,
        card: Colors.default.background,
        text: Colors.default.text,
        border: Colors.default.border,
    },
};

function RootLayoutNav() {
    const {token, loading} = useAuth();

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
            router.replace('/(tabs)');
    }, [token, loading, segments]);

    return (
        <ThemeProvider value={CustomDarkTheme}>
            <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="light" />
        </ThemeProvider>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav/>
        </AuthProvider>
    );
}