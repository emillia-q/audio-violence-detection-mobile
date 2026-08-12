import {ProtectedUserListResponse} from "@/src/api/dto/response/ProtectedUserListResponse";
import {StyleSheet, View} from "react-native";
import EmptyListView from "@/src/components/ui/EmptyListView";
import NavigationCard from "@/src/components/ui/NavigationCard";

interface ProtectedUserListProps {
    protectedUsers: ProtectedUserListResponse[];
}

export default function ProtectedUserList({protectedUsers}: ProtectedUserListProps) {
    // 204
    if (protectedUsers.length === 0) {
        return (
            <EmptyListView
                title={'No protected users'}
                iconName={"people-outline"}
            />
        );
    }

    return (
        <View style={styles.listContainer}>
            {protectedUsers.map((protectedUser) => (
                <NavigationCard
                    key={protectedUser.protectedUserId}
                    title={protectedUser.protectedUserNickname}
                    onPress={() => console.log("Protected user with Id:", protectedUser.protectedUserId)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    },
});