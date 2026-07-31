export type AppMode = 'user' | 'trustedUser'

interface ModeContextData {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
}