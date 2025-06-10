import type { AxiosInstance } from "axios";
import axios from "axios";

export const makeRequest: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // Ensure this is set correctly in the environment file
});


