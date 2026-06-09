import axios from "axios";
import { removeToken } from "../../src/utils";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
