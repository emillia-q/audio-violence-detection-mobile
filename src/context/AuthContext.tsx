import {createContext, ReactNode, useState} from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{
            token,
            login: async () => {},
            logout: async () => {}
        }}>
            {children}
        </AuthContext.Provider>
    )
}