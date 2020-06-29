import Axios, { AxiosPromise, AxiosInstance, AxiosRequestConfig }   from "axios";
import Container, { Service }                   from "typedi";
import { CONFIG_AXIOS_GET_API }                 from "../config/axios";
import { TokenStore }                           from "../Store/TokenStore";
import { ApplicationStore }                     from "../Store/ApplicationStore";
import { stringify }                            from "querystring";

@Service()
export default class AxiosService {

    private _axios: AxiosInstance;
    private isThereAToken: boolean                 = false;

    public constructor() {
        this._axios = Axios.create(CONFIG_AXIOS_GET_API);
        this.createAxios();
    }

    private getTokenStore(): TokenStore {
        return Container.get(ApplicationStore).getStore(TokenStore);
    }

    private createAxios() {
        this.axiosInterceptor();
    }

    private axiosInterceptor() {
        this._axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
            // call a new token
            if (this.isThereAToken) {
                if (config.headers["Content-Type"] === "application/x-www-form-urlencoded") config.data = stringify(config.data);
                return config;
            }

            // call normal api, append token
            const token = this.getTokenStore().getAccessToken();
            config.headers = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded"
            };


            if (token && config.headers.authorization)
                config.headers.authorization = config.headers.authorization.replace("%s", token);

            if (config.headers["Content-Type"] === "application/x-www-form-urlencoded") config.data = stringify(config.data);

            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        this._axios.interceptors.response.use();
    }

    public axiosPost = (url: string, params: any): AxiosPromise<any> => {
        return Axios.post(url, params)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    }

    public axiosGet = (url: string, params?: any): AxiosPromise<any> => {
        return Axios.get(url, params)
            .then(function (response) {
                if (response.status === 200) {
                    return response;
                }
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    }

    public getToken = (email: string, password: string) => {

    }

}