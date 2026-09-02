import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
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
import StatusBadge from "@/src/components/dashboard/shared/StatusBadge";
import {Ionicons} from "@expo/vector-icons";
import AlertModal from "@/src/components/ui/AlertModal";
import BottomSheetHeader from "@/src/components/ui/BottomSheetHeader";

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
    const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

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
    const handleDeleteDevicePress = () => {
        setIsAlertModalVisible(true);
    };

    const handleConfirm = async () => {
        setIsAlertModalVisible(false);

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
                    text1: 'Failed to remove device'
                });
            }
        }
    };

    const handleCancel = () => {
        setIsAlertModalVisible(false);
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
        <>
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
                            <BottomSheetHeader
                                title="Manage Device"
                                iconName="hardware-chip-outline"
                                subtitle={deviceDetails.macAddress}
                                description="Change the device name for easier identification or permanently disconnect it."
                                rightElement={
                                    <StatusBadge
                                        status={deviceDetails.isActivated ? "online" : "warning"}
                                        text={deviceDetails.isActivated ? "Activated" : "Action Required"}
                                    />
                                }
                            />

                            {/* SetUp info */}
                            {!deviceDetails.isActivated && (
                                <View style={[
                                    styles.setupBanner,
                                    {
                                        backgroundColor: theme.warningBg,
                                        borderColor: theme.warningBorder
                                    }
                                ]}
                                >
                                    <View style={styles.bannerHeader}>
                                        <Ionicons name={"information-circle-outline"} size={24} color={theme.warning} />
                                        <Text style={[styles.bannerTitle, {color: theme.text}]}>
                                            Setup Required
                                        </Text>
                                    </View>
                                    <Text style={[styles.bannerText, {color: theme.muted}]}>
                                        This device needs to be activated before it can be used.
                                    </Text>
                                    <CustomButton
                                        title={"View Setup Instructions"}
                                        onPress={handleOpenSetUp}
                                        variant={"outline"}
                                    />
                                </View>
                            )}

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
                                    onPress={handleDeleteDevicePress}
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

            {/* Modals */}
            <AlertModal
                title={"Remove device"}
                message={"Are you sure you want to remove this device?"}
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
    setupBanner: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        gap: 12,
        marginBottom: 24,
    },
    bannerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    bannerText: {
        fontSize: 14,
        lineHeight: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    }
});