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
                backgroundColor: theme.background,
                borderColor: theme.muted
            }
        ]}
        >
            <Text style={[
                styles.title,
                {
                    color: theme.muted
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
        width: '100%',
        alignItems: 'center',
        paddingVertical: 32,
        borderWidth: 1,
        borderRadius: 16,
        borderStyle: 'dashed',
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
    },
});