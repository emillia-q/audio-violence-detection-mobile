import {ProtectedUserListResponse} from "@/src/api/dto/response/ProtectedUserListResponse";
import {StyleSheet} from "react-native";

interface ProtectedUserListProps {
    protectedUsers: ProtectedUserListResponse[];
}

export default function ProtectedUserList({protectedUsers}: ProtectedUserListProps) {

}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    },
});