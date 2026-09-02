import {z} from "zod";
import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import {TrustedUserDetailsResponse} from "@/src/api/dto/response/TrustedUserDetailsResponse";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import BottomSheet from "@/src/components/ui/BottomSheet";
import {userService} from "@/src/api/service/user";
import Toast from "react-native-toast-message";
import AboveInputLabel from "@/src/components/ui/AboveInputLabel";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CustomInput} from "@/src/components/ui/CustomInput";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {ProtectedUserDetailsResponse} from "@/src/api/dto/response/ProtectedUserDetailsResponse";
import AlertModal from "@/src/components/ui/AlertModal";
import SectionHeader from "@/src/components/ui/SectionHeader";

const formSchema = z.object({
    nickname: z.string()
        .max(100, "Nickname cannot be longer than 100 characters")
        .regex(/^$|^(?=.*\S)[a-zA-Z0-9ąęćłńóśźżĄĘĆŁŃÓŚŹŻ ]*$/, "Only letters, numbers and spaces allowed")
        .optional()
        .or(z.literal(''))
});

type FormValues = z.infer<typeof formSchema>;

interface ManageUserSheetProps {
    isVisible: boolean;
    userId: number | null;
    userType: "trusted" | "protected";
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageUserSheet({isVisible, userId, userType, onClose, onSuccess}: ManageUserSheetProps) {
    const theme = useTheme();
    const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

    // Text based on user type
    const title = userType === "trusted" ? "Remove Trusted User"
        : "Remove Protected User";
    const message = userType === "trusted" ? "Are you sure you want to remove this user from your trusted list?"
        : "Are you sure you want to remove this user from your protected list?"

    // Load
    const [isLoading, setIsLoading] = useState(false);

    // Api data
    const [userDetails, setUserDetails] = useState<TrustedUserDetailsResponse | ProtectedUserDetailsResponse | null>(null);

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
            if (userType === "trusted") {
                await userService.changeTrustedUserNickname(userId, {
                    customNickname: data.nickname?.trim() || ""
                });
            } else {
                await userService.changeProtectedUserNickname(userId, {
                    customNickname: data.nickname?.trim() || ""
                });
            }

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

    // Delete related user
    const handleDeleteUserPress = () => {
        setIsAlertModalVisible(true);
    };

    const handleConfirm = async () => {
        setIsAlertModalVisible(false);

        if (!userId)
            return;

        try {
            if (userType === "trusted") {
                await userService.deleteTrustedUser(userId);
            } else {
                await userService.deleteProtectedUser(userId);
            }

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
    };

    const handleCancel = () => {
        setIsAlertModalVisible(false);
    };

    // Fetch api data
    const fetchUserDetails = async (id: number) => {
        setIsLoading(true);
        try {
            let data: TrustedUserDetailsResponse | ProtectedUserDetailsResponse;
            if (userType === "trusted") {
                data = await userService.getTrustedUser(id);
            } else {
                data = await userService.getProtectedUser(id);
            }
            setUserDetails(data);

            // Set nickname in input
            reset({nickname: data.customNickname || ""});
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 404) {
                Toast.show({
                    type: 'error',
                    text1: 'User not found'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Could not load user details'
                });
            }

            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isVisible && userId)
            fetchUserDetails(userId);
        else
            setUserDetails(null);
    }, [isVisible, userId]);

    return (
        <>
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
                            <SectionHeader
                                title={`Manage ${userType === "trusted" ? "Trusted" : "Protected"} User`}
                                iconName={"person-outline"}
                                subtitle={`${userDetails.firstName} ${userDetails.lastName}`}
                                description="Set a custom nickname to quickly identify this user on your list, or remove their access entirely."
                            />

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
                                    onPress={handleDeleteUserPress}
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

            {/* Modals */}
            <AlertModal
                title={title}
                message={message}
                isVisible={isAlertModalVisible}
                cancelText={"Cancel"}
                confirmText={"Remove"}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    }
});