import { LocalStorageManager, SessionStorageManager } from 'ts/storage/storage-manager';
import { deepClone } from 'ts/clone';



export namespace CCache {

    // tslint:disable-next-line:ban-types
    const cacheKey = '_cache';
    let localData = LocalStorageManager.get(cacheKey, false);
    if (!localData) {
        LocalStorageManager.set(cacheKey, localData = {}, false);
    }
    let sessionData = SessionStorageManager.get(cacheKey, false);
    if (!sessionData) {
        SessionStorageManager.set(cacheKey, sessionData = {}, false);
    }

    let localDefaultValueAware = {};
    let sessionDefaultValueAware = {};

    function basic(cacheData, defaultValueAware, name: string, defaultValue: any, root: string, target, key: string) {
        let rootData = cacheData[root];
        if (!rootData) {
            rootData = cacheData[root] = {};
        }
        if (!defaultValueAware[root]) {
            defaultValueAware[root] = {};
        }
        // tslint:disable-next-line:variable-name
        let _key = name + '.' + key;
        defaultValueAware[root][_key] = defaultValue;
        // tslint:disable-next-line:variable-name
        rootData[_key] = deepClone(deepClone(defaultValue), rootData[_key]);
        // Delete property.
        delete target[key];
        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get() {
                return rootData[_key];
            },
            set(value) {
                rootData[_key] = value;
            },
            enumerable: true,
            configurable: true
        });
    }

    function reset(data, defauleAware) {
        // tslint:disable-next-line:forin
        for (let root in data) {
            resetRoot(data, defauleAware, root);
        }
    }

    function resetRoot(data, defauleAware, root) {
        if (defauleAware[root] === undefined) { return; }
        for (let key in data[root]) {
            if (defauleAware[root][key] === undefined) { continue; }
            data[root][key] = deepClone(defauleAware[root][key]);
        }
    }

    /**
     * 回寫到storage
     */
    window.addEventListener('unload', () => {
        if (LocalStorageManager.isExist(cacheKey)) {
            LocalStorageManager.set(cacheKey, localData, false);
        }
        if (SessionStorageManager.isExist(cacheKey)) {
            SessionStorageManager.set(cacheKey, sessionData, false);
        }
    });



    export function Local<T>(name: string, defaultValue: T, root: string = '_') {
        return basic.bind(null, localData, localDefaultValueAware, name, defaultValue, root);
    }

    export function Session<T>(name: string, defaultValue: T, root: string = '_') {

        return basic.bind(null, sessionData, sessionDefaultValueAware, name, defaultValue, root);
    }


    export function clearAllLocal() {
        reset(localData, localDefaultValueAware);
    }

    export function clearAllSession() {
        reset(sessionData, sessionDefaultValueAware);
    }

    export function clearLocal(root: string = '_') {
        resetRoot(localData, localDefaultValueAware, root);
    }

    export function clearSession(root: string = '_') {
        resetRoot(sessionData, sessionDefaultValueAware, root);
    }
}


