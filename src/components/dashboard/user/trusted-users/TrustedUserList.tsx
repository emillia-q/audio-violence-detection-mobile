import {TrustedUserListResponse} from "@/src/api/dto/response/TrustedUserListResponse";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import NavigationCard from "@/src/components/ui/NavigationCard";

interface TrustedUserListProps {
    trustedUsers: TrustedUserListResponse[];
}

export default function TrustedUserList({trustedUsers}: TrustedUserListProps) {
    // 204 - empty list
    if (trustedUsers.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                    No trusted users
                </Text>
            </View>
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