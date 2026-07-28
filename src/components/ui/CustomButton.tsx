import {TouchableOpacityProps} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
}

export function CustomButton({style, title, ...rest}: CustomButtonProps) {

}