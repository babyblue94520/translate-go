/**
 * 緩存
 */
export declare namespace Cache {
    /**
     *
     * @param scope 取得緩存資料
     * @param key
     */
    function getLocal(scope: string, key: string): any;
    /**
     *
     * @param scope 取得緩存資料
     * @param key
     */
    function getSession(scope: string, key: string): any;
    /**
     *
     * @param scope 寫入緩存資料
     * @param key
     */
    function setLocal(scope: string, key: string, value: any): any;
    /**
     *
     * @param scope 寫入緩存資料
     * @param key
     */
    function setSession(scope: string, key: string, value: any): any;
    /**
     * window unload 處理
     */
    function onUnloadHandler(): void;
    /**
     * 儲存
     */
    function save(): void;
    /**
     * LocalStorageManager 緩存
     * @param scope cache scope name
     */
    function local(scope: string, defaultValue?: any): any;
    /**
     * SessionStorageManager 緩存
     * @param scope cache scope name
     */
    function session(scope: string, defaultValue?: any): any;
}
