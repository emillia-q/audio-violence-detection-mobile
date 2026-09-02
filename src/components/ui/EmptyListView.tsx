import {StyleSheet, Text, View} from "react-native";
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
                backgroundColor: theme.surfaceElevated,
            }
        ]}
        >
            {/* Optional icon */}
            {iconName && (
                <View style={[
                    styles.iconWrapper,
                    {
                        backgroundColor: theme.background
                    }]}
                >
                    <Ionicons
                        name={iconName}
                        size={42}
                        color={theme.tint}
                    />
                </View>
            )}

            {/* Title */}
            <Text style={[
                styles.title,
                {
                    color: theme.text
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
        paddingVertical: 40,
        paddingHorizontal: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    iconWrapper: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
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