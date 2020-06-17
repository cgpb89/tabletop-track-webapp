import { Service } from "typedi";
import LoadStore from "./LoadStore"
import BaseStore from "./BaseStore";
import { create } from 'mobx-persist';

interface ObjectType<T> {
    new(applicationStore: ApplicationStore): T;

    NAME_STORE: string;
}

@Service()
export class ApplicationStore {

    private stores: { [key: string]: BaseStore } = {};

    public subscribe(store: ObjectType<BaseStore>) {
        this.stores[store.NAME_STORE] = new store(this);
    }

    public getStores = () => this.stores;

    public getStore<T>(store: ObjectType<T>): T {
        const storeName = store.NAME_STORE;
        const value     = this.getStores()[storeName];

        if (!value)
            throw `Error: the Store ${storeName} don't exist or not subscribed`;

        return <T><unknown>value;
    }

    constructor() {
        LoadStore.map(store => this.subscribe(store));
    }
    public async initStorage() {
        const hydrate = await create();

        for (const key in this.getStores()) {
            if (!this.getStores()[key].getNeedPersistData()) continue;

            await hydrate(key, this.getStores()[key]);
            this.getStores()[key].validateDateStoreToClear();
        }
    }

    public clearStoreData() {
        for (const key in this.getStores()) {
            if (this.getStores()[key].getNeedPersistData()) {
                this.getStores()[key].resetStore();
            }
        }
    }
}