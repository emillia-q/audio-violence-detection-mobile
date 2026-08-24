import {DeviceCredentialsRequest} from "@/src/api/dto/request/DeviceCredentialsRequest";
import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, Text, View} from "react-native";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import AboveInputLabel from "@/src/components/ui/AboveInputLabel";
import {CustomInput} from "@/src/components/ui/CustomInput";
import {Colors} from "@/src/constants/theme";

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
}

export default function ManualDeviceForm({onSubmit, onSwitchToScanner}: ManualDeviceFormProps) {
    const theme = useTheme();

    const {control, handleSubmit} = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: 'onTouched',
        defaultValues: {macAddress: "", deviceSecret: ""}
    });

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>

            {/* Title */}
            <Text style={[styles.title, {color: theme.text}]}>Add Device</Text>

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
});