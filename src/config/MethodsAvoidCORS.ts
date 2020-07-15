import Axios, { AxiosPromise } from "axios";
import AccessToken from "../Models/User/AccessToken";

    function axiosPost(url: string, params: any): AxiosPromise<any> {
        return Axios.post(url, params)
            .then(function (response) {
                if (response.status === 200) {
                    return response;
                }
                return;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    }

    function axiosGet(url: string, params?: any): AxiosPromise<AccessToken> {
        return Axios.get(url, params)
            .then(function (response) {
                if (response.status === 200) {
                    console.log("response", response.data);
                    return response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    }

    export default {
        axiosGet,
        axiosPost
    };