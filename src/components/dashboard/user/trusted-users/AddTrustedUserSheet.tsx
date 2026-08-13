import {useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet, Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Colors} from "@/src/constants/theme";

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

            {/* Bottom sheet */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.sheetContainer}
            >
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark half transparent bg
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        backgroundColor: Colors.user.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    }
});