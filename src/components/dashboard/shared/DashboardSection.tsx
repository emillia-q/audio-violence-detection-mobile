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
            <Text style={[
                styles.title,
                {color: theme.muted}
            ]}
            >
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    title: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.2,
        marginBottom: 12,
        marginLeft: 4,
    },
});