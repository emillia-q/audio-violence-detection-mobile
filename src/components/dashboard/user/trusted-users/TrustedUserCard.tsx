import {TouchableOpacity} from "react-native";

interface TrustedUserCardProps {
    id: number;
    nickname: string;
    onPress: () => void;
}

export default function TrustedUserCard({nickname, onPress}: TrustedUserCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}>

        </TouchableOpacity>
    );
}