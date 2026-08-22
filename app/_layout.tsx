import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import {Stack, useRouter, useSegments} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {AuthProvider, useAuth} from "@/src/context/AuthContext";
import {useEffect, useMemo} from "react";
import {ModeProvider, useTheme} from "@/src/context/ModeContext";
import Toast from "react-native-toast-message";
import {toastConfig} from "@/src/components/ui/CustomToast";

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

        // Route groups do not appear in the URL, but they appear in segments
        const inAuthGroup = segments[0] === '(auth)';
        const inMainGroup = segments[0] === '(main)';

        // Keep the visible route in sync with the restored auth state
        if (!token && !inAuthGroup)
            router.replace('/(auth)/login');
        else if (token && !inMainGroup)
            router.replace('/(main)');
    }, [token, loading, segments, router]);

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
        <AuthProvider>
            <ModeProvider>
                <RootLayoutNav/>
                <Toast config={toastConfig}/>
            </ModeProvider>
        </AuthProvider>
    );
}
