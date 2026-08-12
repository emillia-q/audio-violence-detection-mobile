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
            <Text style={[
                styles.title,
                {color: theme.muted}
            ]}
            >
                {title}
            </Text>

            {/* Main content */}
            <View style={styles.content}>
                {children}
            </View>

            {/* Optional button */}
            {actionButton && (
                <View style={styles.actionContainer}>
                    {actionButton}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 12,
        marginLeft: 4,
    },
    content: {
    },
    actionContainer: {
        marginTop: 12,
    },
});