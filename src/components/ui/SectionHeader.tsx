import {Ionicons} from "@expo/vector-icons";
import {ReactNode} from "react";
import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, Text, View} from "react-native";

interface BottomSheetHeaderProps {
    title: string;
    iconName: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    subtitle?: string;
    description?: string;
    rightElement?: ReactNode;
}

export default function SectionHeader({
                                              title,
                                              iconName,
                                              iconColor,
                                              subtitle,
                                              description,
                                              rightElement
                                          }: BottomSheetHeaderProps) {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={[styles.iconWrapper, {backgroundColor: theme.surface}]}>
                    <Ionicons
                        name={iconName}
                        size={28}
                        color={iconColor || theme.tint}
                    />
                </View>

                <View style={styles.headerText}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, {color: theme.text}]}>{title}</Text>

                        {/* Space for e.g. StatusBadge */}
                        {rightElement && (
                            <View style={styles.rightElementContainer}>
                                {rightElement}
                            </View>
                        )}
                    </View>

                    {subtitle && (
                        <Text style={[styles.subtitle, {color: theme.muted}]}>
                            {subtitle}
                        </Text>
                    )}
                </View>
            </View>

            {description && (
                <Text style={[styles.description, {color: theme.muted}]}>
                    {description}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerText: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    rightElementContainer: {
        transform: [{ scale: 0.9 }], // Downscale the badge by 10%
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
    },
});