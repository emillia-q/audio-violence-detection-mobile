import {Redirect} from "expo-router";
import {useAuth} from "@/src/context/AuthContext";

export default function Index() {
    const {token, loading} = useAuth();

    // Do not send a returning user to login while SecureStore is still loading
    if (loading)
        return null;

    return <Redirect href={token ? "/(main)" : "/(auth)/login"} />;
}
