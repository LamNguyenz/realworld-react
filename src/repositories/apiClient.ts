import Token from "@/lib/token";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const host = import.meta.env.VITE_API_HOST;

const apiClient = axios.create({
  baseURL: host,
});

const logOnDev = (message: string, log?: AxiosResponse | InternalAxiosRequestConfig) => {
  if (import.meta.env.DEV) {
    console.log(message, log);
  }
};

apiClient.interceptors.request.use((request) => {
  const jwtToken = Token.getToken();
  const { method, url } = request;

  if (jwtToken) {
    request.headers["Authorization"] = `Token ${jwtToken}`;
  }

  logOnDev(`🚀 [${method?.toUpperCase()}] ${url} | Request`, request);

  return request;
});

apiClient.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const { status } = response;

    logOnDev(`✨ [${method?.toUpperCase()}] ${url} | Response ${status}`, response);

    return response;
  },
  (error) => {
    const { message } = error || {};
    const { status, data } = error.response;
    const { method, url } = error.config;

    if (status === 429) {
      Token.removeToken();
      window.location.reload();
    }

    logOnDev(`🚨 [${method?.toUpperCase()}] ${url} | Error ${status} ${data?.message || ""} | ${message}`, error);

    return Promise.reject(error);
  }
);

export default apiClient;
