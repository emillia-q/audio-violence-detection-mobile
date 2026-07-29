import axios from "axios";

const BASE_URL = process.env.API_URL;

export const apiClient = axios.create({
   baseURL: BASE_URL,
   headers: {
       'Content-Type': 'application/json',
   },
    timeout: 10000,
});