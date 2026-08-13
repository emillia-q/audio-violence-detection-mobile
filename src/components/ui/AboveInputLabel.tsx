import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, Text} from "react-native";

interface AboveInputLabelProps {
    title: string;
}

export default function AboveInputLabel({title}: AboveInputLabelProps) {
    const theme = useTheme();

    return (
        <Text style={[
            styles.label,
            {
                color: theme.muted
            }
        ]}
        >
            {title}
        </Text>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 4,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
});