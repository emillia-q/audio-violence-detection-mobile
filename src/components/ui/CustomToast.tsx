import {ToastConfigParams} from "react-native-toast-message";
import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const CustomErrorToast = ({text1,text2}: ToastConfigParams<any>) => {
    const theme = useTheme();

    return (
        <View style={[
            styles.toastContainer,
            {
                backgroundColor: theme.surfaceElevated,
                borderColor: theme.danger,
            }
        ]}>
            <Ionicons name={"alert-circle"} size={28} color={theme.danger} style={styles.icon}/>

            {/* Text */}
            <View style={styles.textContainer}>
                <Text style={[
                    styles.text1,
                    {
                        color: theme.text,
                    }
                ]}>
                    {text1}
                </Text>
                <Text style={[
                    styles.text2,
                    {
                        color: theme.muted,
                    }
                ]}>
                    {text2}
                </Text>
            </View>
        </View>
    );
}

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