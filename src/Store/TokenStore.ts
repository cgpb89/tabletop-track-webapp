import BaseStore                from "./BaseStore";
import { observable, action }   from "mobx";
import AxiosService             from "../Service/AxiosService";
import Container                from "typedi";
import { persist }              from "mobx-persist";
import AccessToken              from "../Models/User/AccessToken";

export class TokenStore extends BaseStore {
    public static readonly NAME_STORE: string = "TokenStore";

    @persist("object", AccessToken)
    @observable
    private accessToken: string  | undefined;

    protected init() {
        this.needPersistData = true;
    }

    public getAjaxService(): AxiosService {
        return Container.get(AxiosService);
    }

    public resetStore() {
        this.setAccessToken(undefined);
    }

    public getAccessToken(): string | undefined {
        return this.accessToken;
    }

    @action
    public setAccessToken(accessToken?: string): void {
        this.accessToken = accessToken;
    }
}