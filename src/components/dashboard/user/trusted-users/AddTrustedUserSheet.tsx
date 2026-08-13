import {useState} from "react";
import {Keyboard, Modal, StyleSheet, TouchableWithoutFeedback, View} from "react-native";

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

    return (
        <Modal
            visible={isVisible}
            animationType={"slide"}
            transparent={true}
            onRequestClose={onClose}
        >
            {/* Background - click closes the modal and hides the keyboard */}
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); handleClose();}}>
                <View style={styles.overlay}/>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark half transparent bg
    }
});