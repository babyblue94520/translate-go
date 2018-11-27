export abstract class AbstractStroage {
    // 儲存物件
    protected static storage: Storage;
    // 時間前墜
    protected static prefix = '_DATATIME';
    // 暫定一小時超時
    protected static timeout = 60 * 60 * 1000;

    public static isExist(key: string): boolean {
        let storage = this.storage[key];
        return storage != undefined;
    }

    /**
     * get data by key
     * @param key
     */
    public static get(key: string, timeout: boolean = true): any {
        let storage = this.storage[key];
        if (storage) {
            if (timeout) {
                this.refreshTime(key);
            }
            return JSON.parse(storage);
        } else {
            return undefined;
        }
    }

    /**
     * set data by key
     * @param key
     * @param obj
     */
    public static set(key: string, data: any, timeout: boolean = true) {
        if (data == undefined || data == null) {
            this.clean(key);
        } else {
            this.storage[key] = JSON.stringify(data);
            if (timeout) {
                this.refreshTime(key);
            }
        }
    }

    /**
     * get data by key
     * @param key
     */
    public static getNoParse(key: string, timeout: boolean = true): any {
        let storage = this.storage[key];
        if (storage) {
            if (timeout) {
                this.refreshTime(key);
            }
            return storage;
        } else {
            return undefined;
        }
    }
    /**
     * set data by key
     * @param key
     * @param obj
     */
    public static setNoStringify(key: string, str: string, timeout: boolean = true) {
        if (str == undefined || str == null) {
            this.clean(key);
        } else {
            this.storage[key] = str;

            if (timeout) {
                this.refreshTime(key);
            }
        }
    }

    /**
     * 是否超時，順便清除資料
     * @param key
     */
    public static isTimeout(key: string) {
        let dataTime = this.getTime(key);
        if (!dataTime) {
            this.clean(key);
            return true;
        }
        let checkTime = new Date().getTime() - this.timeout;
        if ((checkTime - dataTime) >= 0) {
            this.clean(key);
            return true;
        }
        return false;
    }

    /**
     * 取得timeout
     * @param key
     */
    public static getTime(key: string) {
        return this.storage[key + this.prefix];
    }

    /**
     * 更新時間
     * @param key
     */
    public static refreshTime(key: string) {
        if (this.storage[key]) {
            this.storage[key + this.prefix] = new Date().getTime();
        }
    }

    /**
     * 清除時間
     * @param key
     */
    public static clean(key: string) {
        delete this.storage[key];
        this.cleanTime(key);
    }
    /**
     * 清除時間
     * @param key
     */
    public static cleanTime(key: string) {
        delete this.storage[key + this.prefix];
    }

}
