import axios, { type AxiosRequestConfig } from "axios";

let baseURL = "https://api.gmpentertainment247.com/api/v1";
// process.env.REACT_APP_BASEURL;
const getInitialToken = () => sessionStorage.getItem("token") || "";

interface CreateApiClientOptions extends AxiosRequestConfig {
  /**
   * When true, disables the Axios timeout for this client instance.
   * This is useful for long‑running requests like large uploads.
   */
  noTimeout?: boolean;
}

export const createApiClient = (options: CreateApiClientOptions = {}) => {
  const { noTimeout, timeout, headers, ...rest } = options;

  return axios.create({
    baseURL,
    timeout: noTimeout ? 0 : timeout ?? 15000, // 0 = no timeout in Axios
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${getInitialToken()}`,
      ...(headers ?? {}),
    },
    ...rest,
  });
};

// Generic API response and specific responses
export interface ApiResponse<T = any> {
  status: boolean;
  message: string | Record<string, string | string[]>;
  data: T;
}
