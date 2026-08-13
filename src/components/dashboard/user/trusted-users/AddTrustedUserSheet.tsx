import {useState} from "react";

interface AddTrustedUserSheetProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (email: string, nickname: string) => void;
}

export default function AddTrustedUserSheet({isVisible, onClose, onSubmit}: AddTrustedUserSheetProps) {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

    const handleSubmit = () => {
        const trimmedEmail = email.trim();
        const trimmedNickname = nickname.trim();

        onSubmit(trimmedEmail, trimmedNickname);

        // Clear form after data are sent
        setEmail("");
        setNickname("");
    }

    const handleClose = () => {
        setEmail("");
        setNickname("");
        onClose();
    }
}