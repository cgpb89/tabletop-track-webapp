import Axios, { AxiosInstance, AxiosRequestConfig }   from "axios";
import Container, { Service }                   from "typedi";
import { CONFIG_AXIOS_GET_API }                 from "../config/axios";
import { TokenStore }                           from "../Store/TokenStore";
import { ApplicationStore }                     from "../Store/ApplicationStore";
import { stringify }                            from "querystring";
import AccessToken                              from "../Models/User/AccessToken";
import moment                                   from "moment";
import API_ROUTES                               from "../config/API_ROUTES";
import MethodsAvoidCORS                         from "../config/MethodsAvoidCORS";

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
                "Authorization": `${token?.getAccessToken()}`,
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

    public getToken = async (email: string, password: string) => {
        const params = {
            email,
            password
        };
        const response = await MethodsAvoidCORS.axiosPost(API_ROUTES.POST_TOKEN, params);
        try {
            if (response.data.token) {
                const newToken: AccessToken = new AccessToken();
                newToken.setAccessToken(response.data.token);
                newToken.setAccessTokenExpiresAt(moment().add(1, "days").toDate());

                return newToken;
            } else {
                return undefined;
            }   // throw a text
        } catch (error) {
            console.log(error.message);
            return error.messge;
        }
    }

    public getUserMe = async () => {
        try {
            return this._axios.get(API_ROUTES.GET_USER_ME)
            .then(function (response) {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
        } catch (error) {
            console.log(error.message);
            return error.messge;
        }
    }

    public getUsersByFilter = async (userFilter: string) => {
        try {

            return this._axios.get(`${API_ROUTES.SEARCH_USER_BY_FILTER}${userFilter}`)
            .then(function (response) {
                if (response.status === 200) {
                    return response.data;
                }
                return [];
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
        } catch (error) {
            console.log(error.message);
            return error.messge;
        }
    }

    // ---------- GROUP ---------- //

    public createGroup = async (group: any) => {
        const response = await MethodsAvoidCORS.axiosPost(API_ROUTES.POST_GROUP, group);
        try {
            debugger;
            if (response.status) {
                return true;
            } else {
                return false;
            }   // throw a text
        } catch (error) {
            console.log(error.message);
            return error.messge;
        }
    }

    public listGroup = async (userId: string) => {
        const response = await this._axios.get(API_ROUTES.GET_LIST_GROUP);
        try {
            if (response.status) {
                return response.data;
            } else {
                return false;
            }   // throw a text
        } catch (error) {
            console.log(error.message);
            return error.messge;
        }
    }

    public deleteGroup = async (userId: string, groupId: string) => {
        try {
            return this._axios.delete(`${API_ROUTES.DELETE_GROUP}${groupId}/${userId}`)
            .then(function (response) {
                if (response.status === 200) {
                    return response.data;
                }
                return "";
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
        } catch (error) {
            console.log(error.message);
            return error.messge;
        }
    }

    public viewGroup = async (groupId: string) => {
        const response = await this._axios.get(`${API_ROUTES.GET_GROUP}${groupId}`);
        try {
            if (response.status) {
                console.log(response.data);
                return response.data;
            } else {
                return false;
            }   // throw a text
        } catch (error) {
            console.log(error.message);
            return error.messge;
        }
    }

    public updateGroup = async (group: any) => {
        const response = await this._axios.put(API_ROUTES.PUT_GROUP, group);
        try {
            console.log(response);
            if (response.status) {
                return true;
            } else {
                return false;
            }   // throw a text
        } catch (error) {
            console.log(error.message);
            return error.messge;
        }
    }

}