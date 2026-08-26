import {ActivityIndicator, Alert, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import {DeviceDetailsResponse} from "@/src/api/dto/response/DeviceDetailsResponse";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {deviceService} from "@/src/api/service/device";
import Toast from "react-native-toast-message";
import BottomSheet from "@/src/components/ui/BottomSheet";
import AboveInputLabel from "@/src/components/ui/AboveInputLabel";
import {CustomInput} from "@/src/components/ui/CustomInput";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {useRouter} from "expo-router";

const formSchema = z.object({
    deviceName: z.string()
        .min(1, "Device name cannot be blank")
        .max(100, "Device name cannot exceed 100 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface ManageDeviceSheetProps {
    isVisible: boolean;
    deviceId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ManageDeviceSheet({isVisible, deviceId, onClose, onSuccess}: ManageDeviceSheetProps) {
    const theme = useTheme();
    const router = useRouter();

    // Load
    const [isLoading, setIsLoading] = useState(false);

    // Api data
    const [deviceDetails, setDeviceDetails] = useState<DeviceDetailsResponse | null>(null);

    // Form
    const {control, handleSubmit, reset, formState: {isDirty, isSubmitting}} = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        defaultValues: {deviceName: ""}
    });

    const handleOpenSetUp = () => {
        if (!deviceDetails)
            return;

        // First close bottom sheet
        onClose();

        // Then redirect
        router.push({
            pathname: '/setup-instructions',
            params: {
                macAddress: deviceDetails.macAddress
            }
        });
    };

    // Device name change
    const onValidSubmit = async (data: FormValues) => {
        if (!deviceId)
            return;

        try {
            await deviceService.updateDeviceName(deviceId, {
                name: data.deviceName?.trim() || "",
            });

            Toast.show({
                type: 'success',
                text1: 'Device name updated'
            });

            onSuccess();
            onClose();
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 404) {
                Toast.show({
                    type: 'error',
                    text1: 'Device not found'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to update device name'
                });
            }
        }
    };

    // Delete device
    const handleDeleteDevice = async () => {
        Alert.alert(
            "Remove device",
            "Are you sure you want to remove this device?",
            [
                {text: "Cancel", style: "cancel"},
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        if (!deviceId)
                            return;

                        try {
                            await deviceService.disconnectDevice(deviceId);

                            Toast.show({
                                type: "success",
                                text1: "Device removed"
                            });

                            onSuccess();
                            onClose();
                        } catch (error: any) {
                            const status = error?.response?.status;

                            if (status === 404) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Device not found'
                                });
                            } else {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Could not load device details'
                                });
                            }
                        }
                    }
                }
            ]
        );
    };

    // Fetch api data
    const fetchDeviceDetails = async (id: number) => {
        setIsLoading(true);
        try {
            const data = await deviceService.getDeviceDetails(id);

            setDeviceDetails(data);

            // Set device name in input
            reset({deviceName: data.name || ""});
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 404) {
                Toast.show({
                    type: 'error',
                    text1: 'Device not found'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Could not load device details'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isVisible && deviceId)
            fetchDeviceDetails(deviceId);
        else
            setDeviceDetails(null);
    }, [isVisible, deviceId]);

    return (
        <BottomSheet
            isVisible={isVisible}
            onClose={onClose}
        >
            <View style={styles.content}>
                {isLoading || !deviceDetails ? (
                    // When data is not ready
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={"large"} color={theme.tint}/>
                    </View>
                ) : (
                    // Target form
                    <>
                        <Text style={[styles.title, {color: theme.text}]}>Manage Device</Text>

                        {/* MAC address */}
                        <Text style={[styles.deviceDetails, {color: theme.muted}]}>
                            {deviceDetails.macAddress}
                        </Text>

                        {/* Device name */}
                        <AboveInputLabel title={"Device name"}/>
                        <Controller
                            control={control}
                            name={"deviceName"}
                            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                                <CustomInput
                                    placeholder={"e.g. Room 1"}
                                    placeholderTextColor={theme.placeholder}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={error?.message}
                                />
                            )}
                        />

                        {/* Buttons */}
                        <View style={styles.buttonRow}>
                            <CustomButton
                                title={"Delete device"}
                                isDanger={true}
                                onPress={handleDeleteDevice}
                            />
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
    deviceDetails: {
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