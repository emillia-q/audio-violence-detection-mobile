import {z} from "zod";
import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import {TrustedUserDetailsResponse} from "@/src/api/dto/response/TrustedUserDetailsResponse";
import {Colors} from "@/src/constants/theme";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import BottomSheet from "@/src/components/ui/BottomSheet";
import {userService} from "@/src/api/service/user";
import Toast from "react-native-toast-message";

const formSchema = z.object({
    nickname: z.string()
        .max(100, "Nickname cannot be longer than 100 characters")
        .regex(/^(?=.*\S)[a-zA-Z0-9ąęćłńóśźżĄĘĆŁŃÓŚŹŻ ]*$/, "Only letters, numbers and spaces allowed")
        .optional()
        .or(z.literal(''))
});

type FormValues = z.infer<typeof formSchema>;

interface ManageTrustedUserSheetProps {
    isVisible: boolean;
    trustedUserId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageTrustedUserSheet({isVisible, trustedUserId, onClose, onSuccess}: ManageTrustedUserSheetProps) {
    const theme = useTheme();

    // Load
    const [isLoading, setIsLoading] = useState(false);

    // Api data
    const [userDetails, setUserDetails] = useState<TrustedUserDetailsResponse | null>(null);

    // Fetch api data
    const fetchUserDetails = async (id: number) => {
        setIsLoading(true);
        try {
            const data = await userService.getTrustedUser(id);
            setUserDetails(data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Could not load user details'
            });
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isVisible && trustedUserId)
            fetchUserDetails(trustedUserId);
        else {
            setUserDetails(null);
        }
    }, [isVisible, trustedUserId]);

    return (
        <BottomSheet
            isVisible={isVisible}
            onClose={onClose}
        >
            <View style={styles.content}>
                {isLoading || !userDetails ? (
                    // When data is not ready
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={"large"} color={theme.tint}/>
                    </View>
                ) : (
                    // Target form
                    <>
                        <Text style={styles.title}>Manage User</Text>

                        {/* First & last name */}
                        <Text style={[styles.userName, {color: theme.muted}]}>
                            {userDetails.firstName} {userDetails.lastName}
                        </Text>
                    </>
                )}
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 24,
    },
    loadingContainer: {
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
        color: Colors.user.text,
    },
    userName: {
        fontSize: 16,
        marginBottom: 24,
    },
});