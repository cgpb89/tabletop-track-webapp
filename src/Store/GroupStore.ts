import BaseStore                from "./BaseStore";
import { persist }              from "mobx-persist";
import User                     from "../Models/User/User";
import { observable, action }   from "mobx";
import { serializable, date, deserialize, object }   from "serializr";
import Container                from "typedi";
import AxiosService             from "../Service/AxiosService";
import                          Group from "../Models/Group";

export class GroupStore extends BaseStore {
    public static readonly NAME_STORE: string = "GroupStore";

    @persist("object")
    protected createdStoreAt!: Date;

    @persist("object")
    @serializable(date())
    private previousCallAccess: Date;

    @persist("object")
    @serializable(object(Group))
    private group: Group;

    public constructor(props: any) {
        super(props);
        this.previousCallAccess = new Date();
        this.group = new Group();
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
    }

    public getPreviousAccess(): Date {
        return this.previousCallAccess;
    }

    @action
    public setPreviousAccess(currentDate: Date) {
        this.previousCallAccess = currentDate;
    }

    public getGroup(): Group {
        return this.group;
    }

    public setGroup(group: Group): void {
        this.group = group;
    }

    public async createGroup(group: Group): Promise<string>  {
        const groupObj = this.serialize(group);
console.log("groupObj", groupObj);
       const response = await this.getAjaxService().createGroup(groupObj);
       console.log(response);
        return "";
    }

    private serialize = (group: Group) => {
        const adminUsers: any[] = [];
        group.getAdminUser().forEach((item: User) => {
            adminUsers.push(item.get_id());
        });

        const players: any[] = [];
        group.getPlayers().forEach((item: User) => {
            players.push(item.get_id());
        });

        const data = {
            adminUsers: adminUsers,
            name: group.getName(),
            players: players,
        };
        return data;
    }
}