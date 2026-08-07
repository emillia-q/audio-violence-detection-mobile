import {TrustedUserListResponse} from "@/src/api/dto/response/TrustedUserListResponse";
import {StyleSheet} from "react-native";
import {Colors} from "@/src/constants/theme";

interface TrustedUserListProps {
    trustedUsers: TrustedUserListResponse[];
}

export default function TrustedUserList({trustedUsers}: TrustedUserListProps) {

}

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: Colors.user.surface,
        borderColor: Colors.user.border,
        borderWidth: 1,
        borderRadius: 16,
        borderStyle: 'dashed',
    },
    emptyTitle: {
        color: Colors.user.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContainer: {
        width: '100%',
    },
});