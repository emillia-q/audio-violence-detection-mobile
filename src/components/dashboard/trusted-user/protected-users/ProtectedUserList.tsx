import {ProtectedUserListResponse} from "@/src/api/dto/response/ProtectedUserListResponse";
import {StyleSheet, View} from "react-native";
import EmptyListView from "@/src/components/ui/EmptyListView";
import NavigationCard from "@/src/components/ui/NavigationCard";

interface ProtectedUserListProps {
    protectedUsers: ProtectedUserListResponse[];
    onUserPress: (id: number) => void;
}

export default function ProtectedUserList({protectedUsers, onUserPress}: ProtectedUserListProps) {
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
                    iconName="person-outline"
                    onPress={() => onUserPress(protectedUser.protectedUserId)}
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