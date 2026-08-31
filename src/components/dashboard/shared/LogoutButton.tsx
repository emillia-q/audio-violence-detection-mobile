import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";
import AlertModal from "@/src/components/ui/AlertModal";

interface LogoutButtonProps {
    onLogout: () => void;
}

export default function LogoutButton({onLogout}: LogoutButtonProps) {
    const theme = useTheme();
    const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

    const handlePress = () => {
        setIsAlertModalVisible(true);
    };

    const handleConfirm = () => {
        setIsAlertModalVisible(false);
        onLogout();
    };

    const handleCancel = () => {
        setIsAlertModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity
                onPress={handlePress}
                style={styles.container}
                activeOpacity={0.7}
            >
                <Ionicons name={"log-out-outline"} size={32} color={theme.text}/>
            </TouchableOpacity>

            {/* Alert Modal */}
            <AlertModal
                title={"Log Out"}
                message={"Are you sure you want to log out?"}
                isVisible={isAlertModalVisible}
                cancelText={"Cancel"}
                confirmText={"Log Out"}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
}

const styles = StyleSheet.create({
   container: {
       padding: 8,
   },
});