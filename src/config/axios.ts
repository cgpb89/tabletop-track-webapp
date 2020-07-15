import { AxiosRequestConfig } from "axios";

export const CONFIG_AXIOS_GET_API = <AxiosRequestConfig> {
    baseURL    : process.env.REACT_APP_ENDPOINT_BACKEND,
    headers    : {
        "Content-Type": "application/x-www-form-urlencoded",
        "authorization" : "Bearer %s"
    }
};