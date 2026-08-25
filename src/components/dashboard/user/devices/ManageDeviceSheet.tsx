import {StyleSheet} from "react-native";
import {useTheme} from "@/src/context/ModeContext";
import {useState} from "react";
import {DeviceDetailsResponse} from "@/src/api/dto/response/DeviceDetailsResponse";
import {z} from "zod";

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

    // Load
    const [isLoading, setIsLoading] = useState(false);

    // Api data
    const [deviceDetails, setDeviceDetails] = useState<DeviceDetailsResponse | null>(null);
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
});