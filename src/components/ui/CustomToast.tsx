import {ToastConfigParams} from "react-native-toast-message";
import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

// Base toast
interface BaseToastProps {
    text1?: string;
    text2?: string;
    color: string;
    iconName: keyof typeof Ionicons.glyphMap;
}

const BaseToast = ({ text1, text2, color, iconName }: BaseToastProps) => {
    const theme = useTheme();

    return (
        <View style={[
            styles.toastContainer,
            {
                backgroundColor: theme.surfaceElevated,
                borderColor: color,
            }
        ]}>
            <Ionicons name={iconName} size={28} color={color} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={[styles.text1, { color: theme.text }]}>{text1}</Text>
                {text2 && <Text style={[styles.text2, { color: theme.muted }]}>{text2}</Text>}
            </View>
        </View>
    );
};

// Toast configuration
export const toastConfig = {
    error: ({ text1, text2 }: ToastConfigParams<any>) => {
        const theme = useTheme();
        return <BaseToast text1={text1} text2={text2} color={theme.danger} iconName="alert-circle-outline" />;
    },
    success: ({ text1, text2 }: ToastConfigParams<any>) => {
        const theme = useTheme();
        return <BaseToast text1={text1} text2={text2} color={theme.success} iconName="checkmark-circle-outline" />;
    },
};

const styles = StyleSheet.create({
    toastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderLeftWidth: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        marginTop: 10,
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    text2: {
        fontSize: 14,
    }
});