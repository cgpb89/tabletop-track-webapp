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
    private adminUser: User[];

    @observable
    @serializable(list(object(User)))
    private players: User[];

    public constructor() {
        this._id        = "";
        this.name       = "";
        this.adminUser  = [];
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

    public getAdminUser(): User[] {
        return this.adminUser;
    }

    public setAdminUser(adminUser: User[]): void {
        this.adminUser = adminUser;
    }

    public getPlayers(): User[] {
        return this.players;
    }

    public setPlayers(players: User[] | []): void {
        this.players = players;
    }

}

export default Group;