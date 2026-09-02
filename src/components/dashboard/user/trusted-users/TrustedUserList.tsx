import {TrustedUserListResponse} from "@/src/api/dto/response/TrustedUserListResponse";
import {StyleSheet, View} from "react-native";
import NavigationCard from "@/src/components/ui/NavigationCard";
import EmptyListView from "@/src/components/ui/EmptyListView";

interface TrustedUserListProps {
    trustedUsers: TrustedUserListResponse[];
    onAddTrustedUser: () => void;
    onUserPress: (id: number) => void;
}

export default function TrustedUserList({trustedUsers, onAddTrustedUser, onUserPress}: TrustedUserListProps) {
    // 204 - empty list
    if (trustedUsers.length === 0) {
        return (
            <EmptyListView
                title={'No trusted users'}
                iconName={"person-add-outline"}
                buttonTitle={"+ Add trusted user"}
                onButtonPress={onAddTrustedUser}
            />
        );
    }

    return (
        <View style={styles.listContainer}>
            {trustedUsers.map((trustedUser) => (
                <NavigationCard
                    key={trustedUser.trustedUserId}
                    title={trustedUser.trustedUserNickname}
                    iconName="person-outline"
                    onPress={() => onUserPress(trustedUser.trustedUserId)}
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