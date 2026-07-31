import {createContext, useContext, useState} from "react";

export type AppMode = 'user' | 'trustedUser'

interface ModeContextData {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
}

const ModeContext = createContext<ModeContextData | undefined>(undefined);

export function ModeProvider({children}: {children: React.ReactNode}) {
    const [mode, setMode] = useState<AppMode>('user'); // Load user as domain

    return (
        <ModeContext.Provider value={{mode, setMode}}>
            {children}
        </ModeContext.Provider>
    );
}

// Custom hook to extract mode anywhere in the app
export function useMode() {
    const context = useContext(ModeContext);
    if (!context)
        throw new Error("useMode must be used within a ModeProvider");
    return context;
}