import BaseStore from "./BaseStore";
import { persist } from "mobx-persist";
import User from "../Models/User/User";
import { observable, action } from "mobx";
import { serializable, date, deserialize, object, list } from "serializr";
import Container from "typedi";
import AxiosService from "../Service/AxiosService";
import Group from "../Models/Group";

export class GroupStore extends BaseStore {
    public static readonly NAME_STORE: string = "GroupStore";

    @persist("object")
    protected createdStoreAt!: Date;

    @persist("object")
    @serializable(date())
    private previousCallAccess: Date;

    @serializable(object(Group))
    @observable
    private group: Group;

    @serializable(list(object(Group)))
    @observable
    private groupList: Group[];

    public constructor(props: any) {
        super(props);
        this.previousCallAccess = new Date();
        this.group = new Group();
        this.groupList = [];
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

    public getGroupList(): Group[] {
        return this.groupList;
    }

    public setGroupList(groupList: Group[]): void {
        this.groupList = groupList;
    }

    public async createGroup(group: Group): Promise<boolean> {
        const groupObj = this.serialize(group);
        const response = await this.getAjaxService().createGroup(groupObj);
        return response;
    }

    public async listGroup(userId: string): Promise<Group[]> {
        const response = await this.getAjaxService().listGroup(userId);

        if (response) {
            const result: Group[] = [];
            response.forEach((element: Group) => {
                result.push(deserialize(Group, element));
            });
            return result;
        }
        return [];
    }


    public async deleteGroup(userId: string, groupId: string): Promise<string> {
        const response = await this.getAjaxService().deleteGroup(userId, groupId);
        return response;
    }

    public async viewGroup(groupId: string): Promise<Group> {
        const response = await this.getAjaxService().viewGroup(groupId);

        if (response) {
            const result = deserialize(Group, response);
            return result;
        }
        return new Group();
    }

    public async updateGroup(group: Group, userId: string): Promise<boolean> {
        const groupObj = this.serialize(group);
        groupObj.userId = userId;
        const response = await this.getAjaxService().updateGroup(groupObj);
        return response;
    }

    private serialize = (group: Group) => {
        const adminUsers: any[] = [];
        group.getAdminUsers().forEach((item: User) => {
            adminUsers.push(item.get_id());
        });

        const players: any[] = [];
        group.getPlayers().forEach((item: User) => {
            players.push(item.get_id());
        });

        const data = {
            adminUsers: adminUsers,
            id: group.get_id(),
            name: group.getName(),
            players: players,
            userId: ""
        };
        return data;
    }
}