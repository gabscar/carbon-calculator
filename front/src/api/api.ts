import axios from "axios";
import type { AxiosInstance,AxiosRequestConfig, AxiosResponse } from "axios";

class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    this.api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API error:", error?.response || error);
        return Promise.reject(error);
      }
    );
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config);
  }
}


const apiUrl = import.meta.env.VITE_API_URL;
export default new ApiService(apiUrl);
