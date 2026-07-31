import {StyleSheet, View} from "react-native";
import {Colors} from "@/src/constants/theme";

interface ModeSwitcherProps {
    selectedIndex: number;
    onSelect: (index: number) => void;
}

export default function ModeSwitcher({selectedIndex, onSelect}: ModeSwitcherProps) {
    const isUserMode = selectedIndex === 0;

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