import {StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from "react-native";
import {useTheme} from "@/src/context/ModeContext";

interface NavigationCardProps {
    title: string;
    onPress: () => void;
    style: StyleProp<ViewStyle>;
}

export default function NavigationCard({title, onPress, style}: NavigationCardProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                styles.cardContainer,
                {
                    backgroundColor: theme.surface,
                    borderColor: theme.border
                },
                style
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.title,
                    {
                        color: theme.text
                    }
                ]}
                numberOfLines={1}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.chevronIcon,
                    {
                        color: theme.muted
                    }
                ]}
            >
                ›
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    chevronIcon: {
        fontSize: 24,
        paddingLeft: 8,
    },
});