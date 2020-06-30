import BaseStore                from "./BaseStore";
import { persist }              from "mobx-persist";
import User                     from "../Models/User/User";
import { observable, action }   from "mobx";
import { serializable, date }   from "serializr";
import moment                   from "moment";
import Container                from "typedi";
import AxiosService             from "src/Service/AxiosService";

export class UserStore extends BaseStore {
    public static readonly NAME_STORE: string = "UserStore";

    @persist("object")
    protected createdStoreAt!: Date;

    @persist("object", User)
    @observable
    private user: User | undefined;

    @persist("object")
    @serializable(date())
    private previousCallAccess: Date;

    public constructor(props: any) {
        super(props);
        this.previousCallAccess = new Date();
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

    protected init() {
        this.needPersistData = true;
    }

    public resetStore() {
        this.setPreviousAccess(new Date());
        this.setUser(undefined);
    }

    public getPreviousAccess(): Date {
        return this.previousCallAccess;
    }

    @action
    public setPreviousAccess(currentDate: Date) {
        this.previousCallAccess = currentDate;
    }

    public setUser(user: User | undefined): this {
        this.user = user;

        return this;
    }

    public async getUser(): Promise<User | undefined> {
        const now = moment().add(8, "h");

        // if (!this.getPreviousAccess() || now.isBefore(moment(this.getPreviousAccess()))) {
        //     // Call Axios
        // }

//         const response = await this.getAjaxService().getUser();
// console.log(response);
        // if (response.status === 200) {
        //     this.setToken(response.data);
        // }

        return this.user;
    }
}