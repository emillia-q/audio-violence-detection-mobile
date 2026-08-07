import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import {useTheme} from "@/src/context/ModeContext";

interface EmptyListViewProps {
    title: string;
}

export default function EmptyListView({title}: EmptyListViewProps) {
    const theme = useTheme();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: theme.surface,
                borderColor: theme.border
            }
        ]}
        >
            <Text style={[
                styles.title,
                {
                    color: theme.text
                }
            ]}
            >
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 24,
        borderWidth: 1,
        borderRadius: 16,
        borderStyle: 'dashed',
    },
    title: {
        color: Colors.user.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});