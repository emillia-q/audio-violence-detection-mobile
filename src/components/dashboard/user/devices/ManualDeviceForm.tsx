import {DeviceCredentialsRequest} from "@/src/api/dto/request/DeviceCredentialsRequest";
import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, Text, View} from "react-native";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
});