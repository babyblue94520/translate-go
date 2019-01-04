export declare abstract class AbstractStroage {
    protected static storage: Storage;
    protected static prefix: string;
    protected static timeout: number;
    static isExist(key: string): boolean;
    /**
     * get data by key
     * @param key
     */
    static get(key: string, timeout?: boolean): any;
    /**
     * set data by key
     * @param key
     * @param obj
     */
    static set(key: string, data: any, timeout?: boolean): void;
    /**
     * get data by key
     * @param key
     */
    static getNoParse(key: string, timeout?: boolean): any;
    /**
     * set data by key
     * @param key
     * @param obj
     */
    static setNoStringify(key: string, str: string, timeout?: boolean): void;
    /**
     * 是否超時，順便清除資料
     * @param key
     */
    static isTimeout(key: string): boolean;
    /**
     * 取得timeout
     * @param key
     */
    static getTime(key: string): any;
    /**
     * 更新時間
     * @param key
     */
    static refreshTime(key: string): void;
    /**
     * 清除時間
     * @param key
     */
    static clean(key: string): void;
    /**
     * 清除時間
     * @param key
     */
    static cleanTime(key: string): void;
}
