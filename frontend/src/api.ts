import axios, { AxiosError, AxiosInstance } from 'axios';
import { ROUTES } from './routes';

/**
 * Axios instance as a single entrypoint for making requests, configured with a base URL and credentials handling.
 * Includes a response interceptor to redirect to the sign-in page if the user is not authorized.
 */
export const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      window.location.href = ROUTES.SignIn;
    }
    return Promise.reject(error);
  },
);
