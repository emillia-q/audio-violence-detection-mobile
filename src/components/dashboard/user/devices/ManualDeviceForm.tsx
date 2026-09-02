import {DeviceCredentialsRequest} from "@/src/api/dto/request/DeviceCredentialsRequest";
import {useTheme} from "@/src/context/ModeContext";
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from "react-native";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import AboveInputLabel from "@/src/components/ui/AboveInputLabel";
import {CustomInput} from "@/src/components/ui/CustomInput";
import {CustomButton} from "@/src/components/ui/CustomButton";
import SectionHeader from "@/src/components/ui/SectionHeader";

const formSchema = z.object({
    macAddress: z.string()
        .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, "Invalid MAC address format"),
    deviceSecret: z.string()
        .min(1, "Device secret is required")
});

type FormValues = z.infer<typeof formSchema>;

interface ManualDeviceFormProps {
    onSubmit: (data: DeviceCredentialsRequest) => void;
    onSwitchToScanner: () => void;
    onCancel: () => void;
}

export default function ManualDeviceForm({onSubmit, onSwitchToScanner, onCancel}: ManualDeviceFormProps) {
    const theme = useTheme();

    const {control, handleSubmit} = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onTouched',
        defaultValues: {macAddress: "", deviceSecret: ""}
    });

    const onFormSubmit = (data: FormValues) => {
        onSubmit({
            macAddress: data.macAddress,
            deviceSecret: data.deviceSecret
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={[styles.container, {backgroundColor: theme.background}]}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >

                <SectionHeader
                    title="Add Device Manually"
                    iconName="hardware-chip-outline"
                    description="Enter the physical MAC address and secret key found on the back of your device."
                />

                {/* Inputs */}
                {/* MAC address */}
                <AboveInputLabel title={"MAC Address"}/>
                <Controller
                    control={control}
                    name={"macAddress"}
                    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                        <CustomInput
                            placeholder={"00:1B:44:11:3A:B7"}
                            placeholderTextColor={theme.placeholder}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoCapitalize={"characters"}
                            errorMessage={error?.message}
                        />
                    )}
                />

                {/* Device secret key */}
                <AboveInputLabel title={"Device Secret Key"}/>
                <Controller
                    control={control}
                    name={"deviceSecret"}
                    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                        <CustomInput
                            placeholder={"Enter device secret key"}
                            placeholderTextColor={theme.placeholder}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry
                            errorMessage={error?.message}
                        />
                    )}
                />

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title={"Pair Device"}
                        onPress={handleSubmit(onFormSubmit)}
                    />
                    <CustomButton
                        title={"Back to Scanner"}
                        variant={"text"}
                        onPress={onSwitchToScanner}
                    />
                    <CustomButton
                        style={{marginTop: 16}}
                        title={"Cancel"}
                        variant={"text"}
                        isDanger={true}
                        onPress={onCancel}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingTop: 40,
        paddingBottom: 60,
    },
    buttonContainer: {
        gap: 16,
        marginTop: 32,
    },
});