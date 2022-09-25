export default class TranslateDB {
    constructor() {
        this.keyRegexp = new RegExp('([^$]?)\{([^{}]+)}', 'g');
        this.groups = [];
        this.notFoundKeys = {};
        this.groupSource = {};
        this.cacheResult = {};
    }
    load(language, source, group) {
        let target = this.getSource(group, language);
        let cache = this.getCache(group, language);
        for (let key in source) {
            target[key] = source[key];
            cache[key] = '';
            delete this.getNotFoundSource(language)[key];
        }
        this.updateGroups();
    }
    getNotFoundKeys() {
        return this.notFoundKeys;
    }
    get(key, args = {}, language, group) {
        let text;
        if (group) {
            text = this.find(key, args, language, group);
        }
        else {
            text = this.findAll(key, args, language);
        }
        if (!text) {
            console.warn(key, 'translate source not found.');
        }
        return text;
    }
    getGroups() {
        return this.groups;
    }
    getGroupSource() {
        return this.groupSource;
    }
    getLanguageSource(group) {
        return this.groupSource[group];
    }
    removeLanguageSource(group) {
        delete this.groupSource[group];
        this.updateGroups();
    }
    clearCache() {
        this.cacheResult = {};
    }
    updateGroups() {
        this.groups.length = 0;
        for (let group in this.groupSource) {
            this.groups.push(group);
        }
        this.groups.sort();
    }
    findAll(key, args, language) {
        let result = key;
        for (let group in this.groupSource) {
            let result = this.find(key, args, language, group);
            if (result != key)
                return result;
        }
        return result;
    }
    find(key, args, language, group, prevMatchKeys = {}) {
        if (!key) {
            return key;
        }
        let cache = this.getCache(group, language);
        let result = cache[key];
        if (result) {
            return result;
        }
        if (typeof key != 'string') {
            console.warn('key must be a string.');
            return key;
        }
        let presentMatchKeys = {};
        let matchCount = 0;
        result = key.replace(this.keyRegexp, (...matchs) => {
            matchCount++;
            let match = matchs[2];
            if (!prevMatchKeys[match]) {
                let text = this.getText(match, args, language, group);
                if (text != undefined) {
                    if (this.keyRegexp.test(text)) {
                        presentMatchKeys[match] = true;
                    }
                    return matchs[1] + text;
                }
            }
            return matchs[0];
        });
        if (matchCount == 0) {
            return key;
        }
        if (this.isEmpty(presentMatchKeys)) {
            if (this.isEmpty(args)) {
                cache[key] = result;
            }
            return result;
        }
        else {
            for (let name in presentMatchKeys) {
                prevMatchKeys[name] = presentMatchKeys[name];
            }
            return this.find(result, args, language, group, prevMatchKeys);
        }
    }
    getText(key, args, language, group) {
        let result = args[key];
        if (result != undefined) {
            return result;
        }
        let source = this.getSource(group, language);
        result = source[key];
        if (result) {
            return result;
        }
        else {
            this.getNotFoundSource(language)[key] = key;
            return undefined;
        }
    }
    isEmpty(object) {
        for (let i in object) {
            return false;
        }
        return true;
    }
    getCache(group, language) {
        let temp = (this.cacheResult[group] || (this.cacheResult[group] = {}));
        return temp[language] || (temp[language] = {});
    }
    getSource(group, language) {
        let temp = (this.groupSource[group] || (this.groupSource[group] = {}));
        return temp[language] || (temp[language] = {});
    }
    getNotFoundSource(language) {
        return this.notFoundKeys[language] || (this.notFoundKeys[language] = {});
    }
}
