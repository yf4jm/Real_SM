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
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response || {};
    const originalRequest = error.config;

    if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
      // Handle internal server error
    } else if (status === StatusCodes.UNAUTHORIZED) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          // Attempt to refresh the access token
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
          const newAccessToken = response.data.access;

          // Update local storage and set the new token in headers
          localStorage.setItem("access_token", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request with the new access token
          return Api(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          window.localStorage.clear();
          // if (window.location.pathname !== '/login') {
            
            
          //   document.location.href = '/login';
          // }
        }
      } else {
        window.localStorage.clear();
        // if (window.location.pathname !== '/login') {
        //   console.log(2);
        //   document.location.href = '/login';
        // }
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
