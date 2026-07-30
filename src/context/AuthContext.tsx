import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import {setLogoutHandler} from "@/src/api/client";

const TOKEN_KEY = 'token';

interface AuthContextType {
    token: string | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Check storage once when launching the app
    useEffect(() => {
        // Link logout function to Axios interceptor for 401 handling
        setLogoutHandler(logout);
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
                if (storedToken)
                    setToken(storedToken);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadToken();
    }, []);

    // Called after successful login
    const login = async (token: string) => {
        // Save token in store
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        // Save token in cache
        setToken(token);
    }

    const logout = async  () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{
            token,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
}