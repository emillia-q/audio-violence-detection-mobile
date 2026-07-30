import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'token';

interface AuthContextType {
    token: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);

    // Check storage once when launching the app
    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
                if (storedToken)
                    setToken(storedToken);
            } catch (error) {
                console.error(error);
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