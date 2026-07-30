import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Colors } from '@/src/constants/theme';
import {AuthProvider, useAuth} from "@/src/context/AuthContext";

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
    const {token} = useAuth();

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