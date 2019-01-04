import { LocalStorageManager } from '../storage/local-storage-manager';
import { SessionStorageManager } from '../storage/session-storage-manager';
import { CUI } from '../cui';
/**
 * 緩存
 */
export var Cache;
(function (Cache) {
    var id = '__TranslateGOCache';
    /** 需要回寫的方法 */
    var cacheUnloadHandlers = {};
    var localCache = LocalStorageManager.get(id, false) || {};
    var sessionCache = SessionStorageManager.get(id, false) || {};
    /**
     *
     * @param scope 取得緩存資料
     * @param key
     */
    function getLocal(scope, key) {
        return localCache[scope + '.' + key];
    }
    Cache.getLocal = getLocal;
    /**
     *
     * @param scope 取得緩存資料
     * @param key
     */
    function getSession(scope, key) {
        return sessionCache[scope + '.' + key];
    }
    Cache.getSession = getSession;
    /**
     *
     * @param scope 寫入緩存資料
     * @param key
     */
    function setLocal(scope, key, value) {
        return localCache[scope + '.' + key] = value;
    }
    Cache.setLocal = setLocal;
    /**
     *
     * @param scope 寫入緩存資料
     * @param key
     */
    function setSession(scope, key, value) {
        return sessionCache[scope + '.' + key] = value;
    }
    Cache.setSession = setSession;
    /**
     * window unload 處理
     */
    function onUnloadHandler() {
        for (var key in cacheUnloadHandlers) {
            cacheUnloadHandlers[key]();
        }
        if (LocalStorageManager.isExist(id)) {
            LocalStorageManager.set(id, localCache, false);
        }
        if (SessionStorageManager.isExist(id)) {
            SessionStorageManager.set(id, sessionCache, false);
        }
    }
    Cache.onUnloadHandler = onUnloadHandler;
    /**
     * 儲存
     */
    function save() {
        LocalStorageManager.set(id, localCache, false);
        SessionStorageManager.set(id, sessionCache, false);
    }
    Cache.save = save;
    /**
     * 緩存方法
     * @param cache
     * @param scope
     * @param target
     * @param key
     */
    function basic(cache, scope, defaultValue, target, key) {
        var _cacheKey = scope + '.' + key;
        var _val = CUI.deepClone(defaultValue, cache[_cacheKey]);
        cache[_cacheKey] = _val;
        cacheUnloadHandlers[_cacheKey] = function () {
            cache[_cacheKey] = CUI.deepClone(_val);
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
    function local(scope, defaultValue) {
        return basic.bind(undefined, localCache, scope, defaultValue);
    }
    Cache.local = local;
    /**
     * SessionStorageManager 緩存
     * @param scope cache scope name
     */
    function session(scope, defaultValue) {
        return basic.bind(undefined, sessionCache, scope, defaultValue);
    }
    Cache.session = session;
})(Cache || (Cache = {}));
/**
 * 回寫到storage
 */
window.addEventListener('unload', Cache.onUnloadHandler);
Cache.save();
//# sourceMappingURL=cache.js.map