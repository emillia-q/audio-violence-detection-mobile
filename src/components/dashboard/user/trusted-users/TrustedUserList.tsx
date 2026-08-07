import {TrustedUserListResponse} from "@/src/api/dto/response/TrustedUserListResponse";
import {StyleSheet, View} from "react-native";
import NavigationCard from "@/src/components/ui/NavigationCard";
import EmptyListView from "@/src/components/ui/EmptyListView";

interface TrustedUserListProps {
    trustedUsers: TrustedUserListResponse[];
}

export default function TrustedUserList({trustedUsers}: TrustedUserListProps) {
    // 204 - empty list
    if (trustedUsers.length === 0) {
        return (
            <EmptyListView title={'No trusted users'}/>
        );
    }

    // 200 - list of trusted users
    return (
        <View style={styles.listContainer}>
            {trustedUsers.map((trustedUser) => (
                <NavigationCard
                    key={trustedUser.trustedUserId}
                    title={trustedUser.trustedUserNickname}
                    onPress={() => console.log(`Trusted user with id: ${trustedUser.trustedUserId}`)}
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