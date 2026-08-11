import {ProtectedUserListResponse} from "@/src/api/dto/response/ProtectedUserListResponse";
import {StyleSheet} from "react-native";
import EmptyListView from "@/src/components/ui/EmptyListView";

interface ProtectedUserListProps {
    protectedUsers: ProtectedUserListResponse[];
}

export default function ProtectedUserList({protectedUsers}: ProtectedUserListProps) {
    // 204
    if (protectedUsers.length === 0) {
        return (
            <EmptyListView title={"No protected users"}/>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    },
});