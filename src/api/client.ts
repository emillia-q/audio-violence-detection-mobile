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
)