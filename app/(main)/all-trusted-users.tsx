import {useTheme} from "@/src/context/ModeContext";
import {useEffect, useState} from "react";
import Toast from "react-native-toast-message";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {Stack} from "expo-router";
import PaginationFooter from "@/src/components/ui/PaginationFooter";
import {TrustedUserListResponse} from "@/src/api/dto/response/TrustedUserListResponse";
import {userService} from "@/src/api/service/user";
import TrustedUserList from "@/src/components/dashboard/user/trusted-users/TrustedUserList";
import ManageUserSheet from "@/src/components/dashboard/shared/ManageUserSheet";

const PAGE_SIZE = 10;

export default function AllTrustedUsersScreen() {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [trustedUsers, setTrustedUsers] = useState<TrustedUserListResponse[]>([]);
    const [isManageUserVisible, setIsManageUserVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const fetchTrustedUsers = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const data = await userService.getListOfTrustedUsers(pageNumber, PAGE_SIZE);
            setTrustedUsers(data);
            if (data.length < PAGE_SIZE)
                setHasMorePages(false);
            else
                setHasMorePages(true);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error fetching trusted users',
            });
        } finally {
            setIsLoading(false);
        }
    }

    // Refresh each time teh page changes
    useEffect(() => {
        fetchTrustedUsers(page);
    }, [page]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header config via expo-router */}
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Trusted users",
                    headerBackTitle: "Back", // iOS
                    headerTintColor: theme.tint,
                    headerStyle: { backgroundColor: theme.background },
                    headerShadowVisible: false
                }}
            />

            {isLoading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size={"large"} color={theme.tint}/>
                </View>
            ) : (
                <>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <TrustedUserList
                            trustedUsers={trustedUsers}
                            onUserPress={(id) => {
                                setSelectedUserId(id);
                                setIsManageUserVisible(true);
                            }}
                        />
                    </ScrollView>

                    {/* Pagination */}
                    <PaginationFooter
                        page={page}
                        hasMorePages={hasMorePages}
                        onPrev={() => {
                            setPage(prev => Math.max(0, prev - 1))
                        }}
                        onNext={() => {
                            setPage(prev => prev + 1)
                        }}
                    />

                    {/* Alert manage modal */}
                    <ManageUserSheet
                        isVisible={isManageUserVisible}
                        userId={selectedUserId}
                        userType={"trusted"}
                        onClose={() => {
                            setIsManageUserVisible(false);
                            setSelectedUserId(null);
                        }}
                        onSuccess={() => fetchTrustedUsers(page)}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 24,
    },
});