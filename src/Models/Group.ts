import { observable }                   from "mobx";
import { serializable, list, object }   from "serializr";
import User                             from "./User/User";

class Group {
    @observable
    @serializable
    private _id: string;

    @observable
    @serializable
    private name: string;

    @observable
    @serializable(list(object(User)))
    private adminUsers: User[];

    @observable
    @serializable(list(object(User)))
    private players: User[];

    public constructor() {
        this._id        = "";
        this.name       = "";
        this.adminUsers  = [];
        this.players    = [];
    }

    public get_id(): string {
        return this._id;
    }

    public set_id(_id: string): void {
        this._id = _id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getAdminUsers(): User[] {
        return this.adminUsers;
    }

    public setAdminUsers(adminUser: User[]): void {
        this.adminUsers = adminUser;
    }

    public getPlayers(): User[] {
        return this.players;
    }

    public setPlayers(players: User[] | []): void {
        this.players = players;
    }

}

export default Group;