import BaseStore                from "./BaseStore";
import { observable }           from "mobx";
import AxiosService             from "../Service/AxiosService";
import Container                from "typedi";
import { persist }              from "mobx-persist";

export class MessagesStore extends BaseStore {
    public static readonly NAME_STORE: string = "MessagesStore";

    @persist("object")
    protected createdStoreAt: Date;

    @observable
    private message: string | undefined;

    @observable
    private type: boolean | undefined;

    protected init() {
        this.needPersistData = true;
    }

    public constructor (props: any) {
        super(props);
        this.createdStoreAt = new Date();
        this.message = "";
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

    public getMessage = (): string | undefined => {
        return this.message;
    }

    public setMessage = (errorMessage: string | undefined): void => {
        this.message = errorMessage;
    }

    public getType = (): boolean | undefined => {
        return this.type;
    }

    public setType = (type: boolean | undefined): void => {
        this.type = type;
    }
}