import {createContext, useContext, useMemo, useState} from "react";
import {getTheme, type AppTheme, ThemeName} from "@/src/constants/theme";

export type AppMode = ThemeName;

interface ModeContextData {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
    theme: AppTheme;
}

const ModeContext = createContext<ModeContextData | undefined>(undefined);

export function ModeProvider({
     children,
     initialMode = 'user',
 }:
 {
     children: React.ReactNode;
     initialMode?:AppMode;
 }) {
    const [mode, setMode] = useState<AppMode>(initialMode); // Load user as domain

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ModeContext.Provider value={{mode, setMode, theme}}>
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

// Current role theme
export function useTheme() {
    return useMode().theme;
}
