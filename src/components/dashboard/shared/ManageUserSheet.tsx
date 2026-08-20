import {z} from "zod";
import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import {TrustedUserDetailsResponse} from "@/src/api/dto/response/TrustedUserDetailsResponse";
import {ActivityIndicator, Alert, StyleSheet, Text, View} from "react-native";
import BottomSheet from "@/src/components/ui/BottomSheet";
import {userService} from "@/src/api/service/user";
import Toast from "react-native-toast-message";
import AboveInputLabel from "@/src/components/ui/AboveInputLabel";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CustomInput} from "@/src/components/ui/CustomInput";
import {CustomButton} from "@/src/components/ui/CustomButton";

const formSchema = z.object({
    nickname: z.string()
        .max(100, "Nickname cannot be longer than 100 characters")
        .regex(/^$|^(?=.*\S)[a-zA-Z0-9ąęćłńóśźżĄĘĆŁŃÓŚŹŻ ]*$/, "Only letters, numbers and spaces allowed")
        .optional()
        .or(z.literal(''))
});

type FormValues = z.infer<typeof formSchema>;

interface ManageTrustedUserSheetProps {
    isVisible: boolean;
    userId: number | null;
    userType: "trusted" | "protected";
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageUserSheet({isVisible, userId, onClose, onSuccess}: ManageTrustedUserSheetProps) {
    const theme = useTheme();

    // Load
    const [isLoading, setIsLoading] = useState(false);

    // Api data
    const [userDetails, setUserDetails] = useState<TrustedUserDetailsResponse | null>(null);

    // Form
    const {control, handleSubmit, reset, formState: {isDirty, isSubmitting}} = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        defaultValues: {nickname: ""}
    });

    // Nickname change
    const onValidSubmit = async (data: FormValues) => {
        if (!userId)
            return;

        try {
            await userService.changeTrustedUserNickname(userId, {
                customNickname: data.nickname?.trim() || ""
            });

            Toast.show({
                type: 'success',
                text1: 'Nickname updated'
            });

            onSuccess();
            onClose();
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 404) {
                Toast.show({type: 'error', text1: 'User not found'});
            } else if (status === 400) {
                Toast.show({type: 'error', text1: 'Invalid nickname format'});
            } else {
                Toast.show({type: 'error', text1: 'Failed to update nickname'});
            }
        }
    };

    // Delete trusted user
    const handleDeleteTrustedUser = () => {
        Alert.alert(
            "Remove Trusted User",
            "Are you sure you want to remove this user from your trusted list?",
            [
                {text: "Cancel", style: "cancel"},
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        if (!userId)
                            return;

                        try {
                            await userService.deleteTrustedUser(userId);
                            Toast.show({
                                type: 'success',
                                text1: 'User removed'
                            });

                            onSuccess();
                            onClose();
                        } catch (error: any) {
                            const status = error?.response?.status;

                            if (status === 404) {
                                Toast.show({type: 'error', text1: 'User not found'});
                            } else {
                                Toast.show({type: 'error', text1: 'Failed to remove user'});
                            }
                        }
                    }
                }
            ]
        )
    }

    // Fetch api data
    const fetchUserDetails = async (id: number) => {
        setIsLoading(true);
        try {
            const data = await userService.getTrustedUser(id);
            setUserDetails(data);

            // Set nickname in input
            reset({nickname: data.customNickname || ""});
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
        if (isVisible && userId)
            fetchUserDetails(userId);
        else {
            setUserDetails(null);
        }
    }, [isVisible, userId]);

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
                        <Text style={[styles.title, {color: theme.text}]}>Manage User</Text>

                        {/* First & last name */}
                        <Text style={[styles.userName, {color: theme.muted}]}>
                            {userDetails.firstName} {userDetails.lastName}
                        </Text>

                        {/* Nickname */}
                        <AboveInputLabel title={"Nickname (optional)"}/>
                        <Controller
                            control={control}
                            name={"nickname"}
                            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                                <CustomInput
                                    placeholder={"e.g. Ania"}
                                    placeholderTextColor={theme.placeholder}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={error?.message}
                                />
                            )}
                        />

                        <View style={styles.buttonRow}>
                            {/* Delete trusted user btn */}
                            <CustomButton
                                title={"Remove user"}
                                isDanger={true}
                                onPress={handleDeleteTrustedUser}
                            />
                            {/* Change nickname btn */}
                            <CustomButton
                                title={"Save"}
                                onPress={handleSubmit(onValidSubmit)}
                                disabled={!isDirty || isSubmitting}
                            />
                        </View>
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
    },
    userName: {
        fontSize: 16,
        marginBottom: 24,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    }
});