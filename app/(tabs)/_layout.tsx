import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/src/components/haptic-tab';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { Colors } from '@/src/constants/theme';

export default function TabLayout() {
    // For now hardcoded
    // It will be downloaded Context/Reduxa
    const activeColors = Colors.default;

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: activeColors.tint,
                tabBarInactiveTintColor: activeColors.placeholder,
                tabBarStyle: {
                    backgroundColor: activeColors.background,
                    borderTopColor: activeColors.border,
                },
                headerShown: false,
                tabBarButton: HapticTab,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
        </Tabs>
    );
}
