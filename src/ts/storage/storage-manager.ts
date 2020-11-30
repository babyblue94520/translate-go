
export class StorageManager {
    // 時間前墜
    private prefix = '_expire';

    /**
     *
     * @param storage
     * @param timeout
     */
    constructor(private storage: Storage, private timeout: number = 60 * 60 * 1000) {
    }

    public isExist(key: string): boolean {
        return this.storage[key] !== undefined;
    }

    /**
     * get data by key
     * @param key
     */
    public get(key: string, timeout: boolean = true): any {
        let storage = this.storage[key];
        if (storage === undefined) {
            return undefined;
        } else {
            if (timeout) {
                this.refreshTime(key);
            }
            return JSON.parse(storage);
        }
    }

    /**
     * set data by key
     * @param key
     * @param obj
     */
    public set(key: string, data: any, timeout: boolean = true) {
        if (data === undefined) {
            this.clear(key);
        } else {
            this.storage[key] = JSON.stringify(data);
            if (timeout) {
                this.refreshTime(key);
            }
        }
    }

    /**
     * 是否到期，順便清除資料
     * @param key
     */
    public isExpired(key: string) {
        let time = this.getTime(key);
        if (!time) {
            this.clear(key);
            return true;
        }
        let checkTime = new Date().getTime() - this.timeout;
        if ((checkTime - time) >= 0) {
            this.clear(key);
            return true;
        }
        return false;
    }

    /**
     * 取得timeout
     * @param key
     */
    public getTime(key: string) {
        return this.storage[key + this.prefix];
    }

    /**
     * 更新時間
     * @param key
     */
    public refreshTime(key: string) {
        if (this.storage[key]) {
            this.storage[key + this.prefix] = new Date().getTime();
        }
    }

    /**
     * 清除時間
     * @param key
     */
    public clear(key: string) {
        delete this.storage[key];
        this.clearTime(key);
    }
    /**
     * 清除時間
     * @param key
     */
    public clearTime(key: string) {
        delete this.storage[key + this.prefix];
    }

}

export const LocalStorageManager = new StorageManager(localStorage);

export const SessionStorageManager = new StorageManager(sessionStorage);

