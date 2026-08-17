import {Alert, ScrollView, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {ProtectedUserListResponse} from "@/src/api/dto/response/ProtectedUserListResponse";
import {userService} from "@/src/api/service/user";
import ProtectedUserList from "@/src/components/dashboard/trusted-user/protected-users/ProtectedUserList";
import DashboardSection from "@/src/components/dashboard/shared/DashboardSection";

export default function TrustedUserDashboard() {
    const [protectedUsers, setProtectedUsers] = useState<ProtectedUserListResponse[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const [protectedUsersResult] = await Promise.allSettled([
                userService.getListOfProtectedUsers()
            ]);

            let hasErrors = false;

            // Protected Users
            if (protectedUsersResult.status === 'fulfilled')
                setProtectedUsers(protectedUsersResult.value);
            else
                hasErrors = true;

            if (hasErrors) {
                Alert.alert(
                    "Sync Issue",
                    "Some dashboard data could not be loaded. " +
                    "Please check your internet connection."
                );
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false} // Hide scroll bar
        >
            <DashboardSection title={"Protected users"}>
                <ProtectedUserList protectedUsers={protectedUsers}/>
            </DashboardSection>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        gap: 24,
        paddingBottom: 40,
    }
});