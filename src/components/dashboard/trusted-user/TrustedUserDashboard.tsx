import {StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {ProtectedUserListResponse} from "@/src/api/dto/response/ProtectedUserListResponse";
import {userService} from "@/src/api/service/user";
import ProtectedUserList from "@/src/components/dashboard/trusted-user/protected-users/ProtectedUserList";

export default function TrustedUserDashboard() {
    const [protectedUsers, setProtectedUsers] = useState<ProtectedUserListResponse[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [protectedUsersResult] = await Promise.allSettled([
                    userService.getListOfProtectedUsers()
                ]);

                // Protected Users
                if (protectedUsersResult.status === 'fulfilled')
                    setProtectedUsers(protectedUsersResult.value);
                else
                    console.error('Could not load protected users: ', protectedUsersResult.reason);
            } catch (error) {
                alert(error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <View style={styles.container}>
            <ProtectedUserList protectedUsers={protectedUsers}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 24,
    },
});