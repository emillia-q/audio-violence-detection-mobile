import {createContext, ReactNode, useState} from "react";
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