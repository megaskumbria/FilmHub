import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../constants/constants";

interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await apiClient.post(`${API_URL}/auth/refresh`);

        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(new Error(refreshError as string));
      }
    }

    return Promise.reject(error);
  },
);
