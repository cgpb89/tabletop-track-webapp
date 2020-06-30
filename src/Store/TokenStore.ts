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
    private accessToken: AccessToken  | undefined;

    @persist("object")
    protected createdStoreAt: Date;

    protected init() {
        this.needPersistData = true;
    }

    public constructor (props: any) {
        super(props);
        this.createdStoreAt = new Date();
    }

    public getAjaxService(): AxiosService {
        return Container.get(AxiosService);
    }

    public getCreatedStoreAt(): Date {
        return this.createdStoreAt;
    }

    public setCreatedStoreAt(createdStoreAt: Date): void {
        this.createdStoreAt = createdStoreAt;
    }

    public resetStore() {
        this.setAccessToken(undefined);
    }

    public getAccessToken(): AccessToken | undefined {
        return this.accessToken;
    }

    @action
    public setAccessToken(accessToken: AccessToken | undefined): void {
        this.accessToken = accessToken;
    }

    public setToken = async (email: string, password: string) => {
        const response = await this.getAjaxService().getToken(email, password);
        this.setAccessToken(response);
    }
}