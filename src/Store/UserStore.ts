import BaseStore from "./BaseStore";
import { persist } from "mobx-persist";

export class UserStore extends BaseStore {
    public static readonly NAME_STORE: string = "UserStore";

    @persist("object")
    protected createdStoreAt!: Date;

    public getCreatedStoreAt(): Date {
        return this.createdStoreAt;
    }

    public setCreatedStoreAt(createdStoreAt: Date): void {
        this.createdStoreAt = createdStoreAt;
    }
}