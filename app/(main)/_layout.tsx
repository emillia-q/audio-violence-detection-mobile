import {Stack} from 'expo-router';
import React from 'react';
import { Colors } from '@/src/constants/theme';

export default function MainLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.default.background }
            }}
        >
            <Stack.Screen name="index" />
        </Stack>
    );
}
