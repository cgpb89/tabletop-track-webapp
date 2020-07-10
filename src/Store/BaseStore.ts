
import moment               from "moment";
import { ApplicationStore } from "./ApplicationStore";

export default abstract class BaseStore {
    public static readonly NAME_STORE: string;

    private static readonly HOURS_CLEAR_CACHE: number = 6;  //  Hours to clear cache

    protected needPersistData!: boolean;
    private _applicationStore!: ApplicationStore;
    protected createdStoreAt!: Date;

    get applicationStore(): ApplicationStore {
        return this._applicationStore;
    }

    set applicationStore(value: ApplicationStore) {
        this._applicationStore = value;
    }

    public validateDateStoreToClear() {
        if (this.createdStoreAt && (moment().diff(this.createdStoreAt, "hours") >= BaseStore.HOURS_CLEAR_CACHE) ) {
            this.initDate();
            this.resetStore();
        }
    }

    protected init() {}

    public resetStore() {}

    public constructor(applicationStore: ApplicationStore) {
        this.applicationStore = applicationStore;
        this.init();

        if (!this.createdStoreAt) this.initDatePreviousStores();

        if (typeof this.needPersistData === "undefined")
            throw `The storage: ${this.constructor.name} need set property this.needPersistData to false / true`;
    }

    public getNeedPersistData(): boolean {
        return this.needPersistData;
    }

    /**
     * Set a store date based on the previous localstorage
     * saved on the browsers.
     *
     * @private
     * @memberof BaseStore
     */
    private initDatePreviousStores() {
        const monthsAgo = moment().subtract(2, "months").toDate();
        this.createdStoreAt = monthsAgo;
    }

    /**
     * Update the store creation date
     * using current date
     *
     * @private
     * @memberof BaseStore
     */
    private initDate() {
        this.createdStoreAt = moment().toDate();
    }
}