import {Stack} from 'expo-router';
import React from 'react';
import {ModeProvider} from "@/src/context/ModeContext";

export default function AuthLayout() {
    return (
        <ModeProvider initialMode={'default'}>
            <Stack screenOptions={{headerShown: false}}/>
        </ModeProvider>
    );
}
