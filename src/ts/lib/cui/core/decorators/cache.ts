import { deepClone } from '../clone';
import { LocalStorageManager } from '../storage/local-storage-manager';
import { SessionStorageManager } from '../storage/session-storage-manager';

/**
 * 緩存
 */
export namespace Cache {
    const id = '__TranslateGOCache';
    /** 需要回寫的方法 */
    let cacheUnloadHandlers = {};
    let localCache = LocalStorageManager.get(id, false) || {};
    let sessionCache = SessionStorageManager.get(id, false) || {};

    /**
     *
     * @param scope 取得緩存資料
     * @param key
     */
    export function getLocal(scope: string, key: string): any {
        return localCache[scope + '.' + key];
    }

    /**
     *
     * @param scope 取得緩存資料
     * @param key
     */
    export function getSession(scope: string, key: string): any {
        return sessionCache[scope + '.' + key];
    }

    /**
     *
     * @param scope 寫入緩存資料
     * @param key
     */
    export function setLocal(scope: string, key: string, value): any {
        return localCache[scope + '.' + key] = value;
    }

    /**
     *
     * @param scope 寫入緩存資料
     * @param key
     */
    export function setSession(scope: string, key: string, value): any {
        return sessionCache[scope + '.' + key] = value;
    }

    /**
     * window unload 處理
     */
    export function onUnloadHandler() {
        for (let key in cacheUnloadHandlers) {
            cacheUnloadHandlers[key]();
        }
        if (LocalStorageManager.isExist(id)) {
            LocalStorageManager.set(id, localCache, false);
        }
        if (SessionStorageManager.isExist(id)) {
            SessionStorageManager.set(id, sessionCache, false);
        }
    }

    /**
     * 儲存
     */
    export function save() {
        LocalStorageManager.set(id, localCache, false);
        SessionStorageManager.set(id, sessionCache, false);
    }

    /**
     * 緩存方法
     * @param cache
     * @param scope
     * @param target
     * @param key
     */
    function basic(cache, scope: string, defaultValue: any, target, key: string) {
        let _cacheKey = scope + '.' + key;
        let _val = deepClone(defaultValue, cache[_cacheKey]);
        cache[_cacheKey] = _val;
        cacheUnloadHandlers[_cacheKey] = function () {
            cache[_cacheKey] = deepClone(_val);
        };
        // Delete property.
        if (delete target[key]) {
            // Create new property with getter and setter
            Object.defineProperty(target, key, {
                get: function () {
                    return _val;
                },
                set: function (value) {
                    _val = value;
                },
                enumerable: true,
                configurable: true
            });
        }
    }

    /**
     * LocalStorageManager 緩存
     * @param scope cache scope name
     */
    export function local(scope: string, defaultValue?: any) {
        return basic.bind(undefined, localCache, scope, defaultValue);
    }

    /**
     * SessionStorageManager 緩存
     * @param scope cache scope name
     */
    export function session(scope: string, defaultValue?: any) {
        return basic.bind(undefined, sessionCache, scope, defaultValue);
    }
}

/**
 * 回寫到storage
 */
window.addEventListener('unload', Cache.onUnloadHandler);
Cache.save();
