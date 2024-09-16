import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

const AxiosGlobalConfig = () => {
  function handleSuccess(response: AxiosResponse) {
    return response.data;
  }

  function handleError(error: AxiosError) {
    switch (error?.response?.status) {
      default: {
        const responseData = error.response?.data as { message: string };
        const customError = {
          ...error,
          message: responseData?.message,
          statusCode: Number(error.response?.status),
        };
        return Promise.reject(customError);
      }
    }
  }

  const instance = axios.create({
    baseURL: import.meta.env.VITE_BE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(handleSuccess, handleError);

  return instance;
};

const axiosInstance = AxiosGlobalConfig();
export default axiosInstance;
