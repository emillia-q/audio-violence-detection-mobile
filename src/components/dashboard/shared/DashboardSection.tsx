import {ReactNode} from "react";
import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, Text, View} from "react-native";

interface DashboardSectionProps {
    title: string;
    children: ReactNode;
    actionButton?: ReactNode;
}

export default function DashboardSection({title, children, actionButton}: DashboardSectionProps) {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            {/* Section title */}
            <View style={styles.headerRow}>
                <Text style={[styles.title, {color: theme.muted}]}>
                    {title}
                </Text>

                {/* Optional button */}
                {actionButton && (
                    <View style={styles.actionContainer}>
                        {actionButton}
                    </View>
                )}
            </View>

            {/* Main content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    content: {

    },
    actionContainer: {

    },
});