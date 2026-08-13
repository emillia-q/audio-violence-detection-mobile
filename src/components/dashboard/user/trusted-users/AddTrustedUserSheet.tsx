interface AddTrustedUserSheetProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (email: string, nickname: string) => void;
}

