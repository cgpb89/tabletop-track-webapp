import BaseStore                from "./BaseStore";
import { persist }              from "mobx-persist";
import User                     from "../Models/User/User";
import { observable, action }   from "mobx";
import { serializable, date, deserialize }   from "serializr";
import Container                from "typedi";
import AxiosService             from "src/Service/AxiosService";
import moment                   from "moment";

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

    public getUser(): User | undefined {
        return this.user;
    }

    public async getUserMeApi(): Promise<User | undefined> {

        const response = await this.getAjaxService().getUserMe();

        const user: User = deserialize(User, response);

        this.setUser(user)
        .setPreviousAccess(moment().toDate());

        return this.user;
    }

    public async getUsersByFilter(filter: string): Promise<User[] | []>  {
        const response = await this.getAjaxService().getUsersByFilter(filter);
        const users: User[] = [];

        for (const user of response) {
            users.push(deserialize(User, user));
        }

        return users;
    }
}