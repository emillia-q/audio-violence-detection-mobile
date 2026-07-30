import axios from "axios";
import * as SecureStore from 'expo-secure-store'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const TOKEN_KEY = 'token';

export const apiClient = axios.create({
   baseURL: BASE_URL,
   headers: {
       'Content-Type': 'application/json',
   },
    timeout: 10000,
});

// Protection against sending request without a token
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token)
                config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
            console.error("Error while downloading token from SecureStore", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Session expiration
let logoutCallback: (() => void) | null = null;

// Called once in AuthContext
export const setLogoutHandler = (callback: () => void) => {
    logoutCallback = callback;
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                await SecureStore.deleteItemAsync(TOKEN_KEY);

                if (logoutCallback)
                    logoutCallback();
            } catch (error) {
                console.error("Error while deleting expired token", error);
            }
        }
        return Promise.reject(error);
    }
);