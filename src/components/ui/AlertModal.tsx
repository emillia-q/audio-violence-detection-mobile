import {useTheme} from "@/src/context/ModeContext";
import {Modal, StyleSheet} from "react-native";

interface AlertModalProps {
    title: string;
    message: string;
    isVisible: boolean;
}

export default function AlertModal({title, message, isVisible}: AlertModalProps) {
    const theme = useTheme();

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType={"fade"}
        >

        </Modal>
    );
}

const styles = StyleSheet.create({

});