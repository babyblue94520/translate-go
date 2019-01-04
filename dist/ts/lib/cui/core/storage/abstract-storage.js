var AbstractStroage = /** @class */ (function () {
    function AbstractStroage() {
    }
    AbstractStroage.isExist = function (key) {
        var storage = this.storage[key];
        return storage != undefined;
    };
    /**
     * get data by key
     * @param key
     */
    AbstractStroage.get = function (key, timeout) {
        if (timeout === void 0) { timeout = true; }
        var storage = this.storage[key];
        if (storage) {
            if (timeout) {
                this.refreshTime(key);
            }
            return JSON.parse(storage);
        }
        else {
            return undefined;
        }
    };
    /**
     * set data by key
     * @param key
     * @param obj
     */
    AbstractStroage.set = function (key, data, timeout) {
        if (timeout === void 0) { timeout = true; }
        if (data == undefined || data == null) {
            this.clean(key);
        }
        else {
            this.storage[key] = JSON.stringify(data);
            if (timeout) {
                this.refreshTime(key);
            }
        }
    };
    /**
     * get data by key
     * @param key
     */
    AbstractStroage.getNoParse = function (key, timeout) {
        if (timeout === void 0) { timeout = true; }
        var storage = this.storage[key];
        if (storage) {
            if (timeout) {
                this.refreshTime(key);
            }
            return storage;
        }
        else {
            return undefined;
        }
    };
    /**
     * set data by key
     * @param key
     * @param obj
     */
    AbstractStroage.setNoStringify = function (key, str, timeout) {
        if (timeout === void 0) { timeout = true; }
        if (str == undefined || str == null) {
            this.clean(key);
        }
        else {
            this.storage[key] = str;
            if (timeout) {
                this.refreshTime(key);
            }
        }
    };
    /**
     * 是否超時，順便清除資料
     * @param key
     */
    AbstractStroage.isTimeout = function (key) {
        var dataTime = this.getTime(key);
        if (!dataTime) {
            this.clean(key);
            return true;
        }
        var checkTime = new Date().getTime() - this.timeout;
        if ((checkTime - dataTime) >= 0) {
            this.clean(key);
            return true;
        }
        return false;
    };
    /**
     * 取得timeout
     * @param key
     */
    AbstractStroage.getTime = function (key) {
        return this.storage[key + this.prefix];
    };
    /**
     * 更新時間
     * @param key
     */
    AbstractStroage.refreshTime = function (key) {
        if (this.storage[key]) {
            this.storage[key + this.prefix] = new Date().getTime();
        }
    };
    /**
     * 清除時間
     * @param key
     */
    AbstractStroage.clean = function (key) {
        delete this.storage[key];
        this.cleanTime(key);
    };
    /**
     * 清除時間
     * @param key
     */
    AbstractStroage.cleanTime = function (key) {
        delete this.storage[key + this.prefix];
    };
    // 時間前墜
    AbstractStroage.prefix = '_DATATIME';
    // 暫定一小時超時
    AbstractStroage.timeout = 60 * 60 * 1000;
    return AbstractStroage;
}());
export { AbstractStroage };
//# sourceMappingURL=abstract-storage.js.map