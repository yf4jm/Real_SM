import axios from "axios";
import { StatusCodes } from "http-status-codes";

const Api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Correct base URL
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      document.location.href = '/login';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};
    if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
      // Handle internal server error
    } else if (status === StatusCodes.UNAUTHORIZED) {
      window.localStorage.clear();
      document.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default Api;
