interface ManageNotificationSheetProps {
    isVisible: boolean;
    notificationId: number | null;
    isRead: boolean;
    onClose: () => void;
    onSuccess: () => void;
}