import {ReactNode} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useTheme} from "@/src/context/ModeContext";

interface BottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function BottomSheet({isVisible, onClose, children}: BottomSheetProps) {
    const theme = useTheme();

    return (
        <Modal
            visible={isVisible}
            animationType={"slide"}
            transparent={true}
            onRequestClose={onClose}
        >
            {/* Background - click closes the modal and hides the keyboard */}
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); onClose();}}>
                <View style={styles.overlay}/>
            </TouchableWithoutFeedback>

            {/* Bottom sheet */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[styles.sheetContainer, {backgroundColor: theme.background}]}
            >

                {/* Drag indicator */}
                <View style={[styles.dragIndicator, {backgroundColor: theme.border}]}/>

                {children}
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    dragIndicator: {
        width: 36,
        height: 5,
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 12,
    },
});