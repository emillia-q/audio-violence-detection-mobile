import {ReactNode} from "react";
import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, View} from "react-native";

interface DashboardSectionProps {
    title: string;
    children: ReactNode;
    actionButton?: ReactNode;
}

export default function DashboardSection({title, children, actionButton}: DashboardSectionProps) {
    const theme = useTheme();

    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
});