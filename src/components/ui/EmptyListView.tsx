import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import {useTheme} from "@/src/context/ModeContext";
import {Ionicons} from "@expo/vector-icons";
import {CustomButton} from "@/src/components/ui/CustomButton";

interface EmptyListViewProps {
    title: string;
    iconName?: keyof typeof Ionicons.glyphMap;
    buttonTitle?: string;
    onButtonPress?: () => void;
}

export default function EmptyListView({
                                          title,
                                          iconName,
                                          buttonTitle,
                                          onButtonPress
                                      }: EmptyListViewProps) {
    const theme = useTheme();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: theme.background,
                borderColor: theme.border
            }
        ]}
        >
            {/* Optional icon */}
            {iconName && (
                <Ionicons
                    name={iconName}
                    size={48}
                    color={theme.muted}
                    style={styles.icon}
                />
            )}

            {/* Title */}
            <Text style={[
                styles.title,
                {
                    color: theme.muted
                }
            ]}
            >
                {title}
            </Text>

            {/* Optional button in center */}
            {buttonTitle && onButtonPress && (
                <View style={styles.button}>
                    <CustomButton
                        title={buttonTitle}
                        variant={"outline"}
                        onPress={onButtonPress}
                    />
                </View>
            )}
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
    icon: {
        marginBottom: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    button: {
        marginTop: 24,
        width: '100%',
        maxWidth: 220,
    },
});