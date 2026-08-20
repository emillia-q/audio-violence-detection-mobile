interface ManageAlertSheetProps {
    isVisible: boolean;
    alertId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}