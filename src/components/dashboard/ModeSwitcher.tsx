import {StyleSheet, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import {useMode} from "@/src/context/ModeContext";

export default function ModeSwitcher() {
    const {mode, setMode} = useMode();
    const isUserMode = mode === 'user';

    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
   container: {
       padding: 16,
       backgroundColor: Colors.default.background,
   }
});