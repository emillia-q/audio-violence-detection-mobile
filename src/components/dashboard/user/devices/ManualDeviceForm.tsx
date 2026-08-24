import {DeviceCredentialsRequest} from "@/src/api/dto/request/DeviceCredentialsRequest";
import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet} from "react-native";
import {z} from "zod";

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


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
});