import { __decorate } from "tslib";
import TranslateDB from './translate-db';
import TranslateNodePlaceholder from './nodes/translate-node-placeholder';
import TranslateNodeSubmit from './nodes/translate-node-submit';
import TranslateNodeText from './nodes/translate-node-text';
import { Delay } from '../ts/lib/cui/core/decorators/delay';
import { EventListenerContainer } from '../ts/lib/cui/core/listener/event-listener-container';
import { TranslateConst, TranslateEvent } from './constant';
window['getTranslateGO'] = getTranslateGO;
/**
 * 取得TranslateGO
 */
export function getTranslateGO() {
    if (window[TranslateConst.Prefix]) {
        return window[TranslateConst.Prefix];
    }
    else {
        return window[TranslateConst.Prefix] = new TranslateGO();
    }
}
export default class TranslateGO {
    constructor() {
        this.listeners = new EventListenerContainer();
        this.ignoreMap = new Map();
        this.translateGroupMap = new Map();
        this.nodeMap = new Map();
        this.mutationObserver = new MutationObserver((mutations) => {
            this.mutationObserverHandler(mutations);
        });
        this.db = new TranslateDB();
        this.language = navigator.language;
        this.scanning = false;
        this.languages = [];
        this.doClearRemoveNode = () => {
            let ignoreSize = this.ignoreMap.size;
            this.ignoreMap.forEach((v, k, m) => {
                if (!k.isConnected) {
                    m.delete(k);
                }
            });
            let translateSize = this.translateGroupMap.size;
            this.translateGroupMap.forEach((v, k, m) => {
                if (!k.isConnected) {
                    m.delete(k);
                }
            });
            console.log('translate clear ignore size ', ignoreSize, '>', this.ignoreMap.size, ' translate size ', translateSize, '>', this.translateGroupMap.size);
        };
    }
    getLanguage() {
        return this.language;
    }
    getLanguages() {
        return this.languages;
    }
    translate(language, force = false) {
        if (!force && this.language == language)
            return;
        this.language = language;
        this.doTranslate(this.nodeMap, force);
        this.listeners.dispatch(TranslateEvent.LanguageChanged);
    }
    load(language, source, group) {
        this.doLoad(language, source, group);
        this.doStart();
        this.listeners.dispatch(TranslateEvent.SourceChanged);
    }
    loadAll(languageSource, group) {
        for (let language in languageSource) {
            this.doLoad(language, languageSource[language], group);
        }
        this.doStart();
        this.listeners.dispatch(TranslateEvent.SourceChanged);
    }
    doLoad(language, source, group = TranslateConst.DefaultGroup) {
        if (this.languages.indexOf(language) == -1) {
            this.languages.push(language);
        }
        this.db.load(language, source, group);
    }
    removeLanguageSource(group) {
        this.db.removeLanguageSource(group);
        this.listeners.dispatch(TranslateEvent.SourceChanged);
    }
    clearSource() {
        this.db = new TranslateDB();
        this.languages.length = 0;
    }
    isScanning() {
        return this.scanning;
    }
    start() {
        if (this.scanning) {
            return;
        }
        this.doStart();
    }
    stop() {
        this.removeEvents();
        this.scanning = false;
        this.clear();
    }
    addEventListener(event, callback, target) {
        this.listeners.addListener(event, callback, target);
    }
    removeEventListener(event, callback) {
        this.listeners.removeListener(event, callback);
    }
    removeAllEventListener(target) {
        this.listeners.removeAllListener(target);
    }
    get(key, args = {}, language = this.language, group) {
        return this.db.get(key, args, language, group);
    }
    getNotFoundKeys() {
        return this.db.getNotFoundKeys();
    }
    getGroups() {
        return this.db.getGroups();
    }
    getGroupSource() {
        return this.db.getGroupSource();
    }
    getLanguageSource(group) {
        return this.db.getLanguageSource(group);
    }
    doStart() {
        this.removeEvents();
        this.scanning = true;
        this.scan(document.head);
        this.scan(document.body);
        this.doTranslate(this.nodeMap, true);
    }
    mutationObserverHandler(mutations) {
        let map = new Map();
        mutations.forEach((mutation) => {
            switch (mutation.type) {
                case 'attributes':
                    this.scanAttribute(mutation.target, mutation.attributeName, map);
                    break;
                case 'characterData':
                    if (mutation.target instanceof Text) {
                        this.scanText(mutation.target, map);
                    }
                    break;
                case 'childList':
                    this.scan(mutation.target, map);
                    break;
            }
        });
        if (map.size > 0) {
            this.doTranslate(map);
            this.clearRemoveNode();
        }
    }
    /**
     * 監聽 Element 新增跟異動事件
     */
    addEvents() {
        if (this.scanning) {
            this.mutationObserver.observe(document.documentElement, {
                attributeFilter: ['value', 'type', TranslateConst.TranslateKey, TranslateConst.IgnoreAttributeName],
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
    }
    /**
     * 移除 Element 新增跟異動事件
     */
    removeEvents() {
        this.mutationObserver.disconnect();
    }
    scanAttribute(target, key, map) {
        key = key.toLowerCase();
        switch (key) {
            case TranslateConst.TranslateKey:
                let value = target.getAttribute(key);
                let translateNode;
                if (target instanceof HTMLInputElement) {
                    translateNode = new TranslateNodeSubmit(this, target, value);
                    this.addNode(translateNode, map);
                }
                else {
                    translateNode = new TranslateNodeText(this, target, value);
                    this.addNode(translateNode, map);
                }
                break;
            case TranslateConst.IgnoreAttributeName:
                if (target.getAttribute(TranslateConst.IgnoreAttributeName) != 'false') {
                    this.nodeMap.delete(target);
                    this.translateGroupMap.delete(target);
                    this.ignoreMap.set(target, true);
                }
                break;
            case 'value':
            case 'type':
                this.addNode(new TranslateNodeSubmit(this, target, this.findGroup(target)), map);
                break;
        }
    }
    scan(node, map, index = -1) {
        // node is Text
        if (node instanceof Text) {
            this.scanText(node, map, index);
        }
        else if (node.nodeType == 1) {
            if (this.ignore(node)) {
                return;
            }
            let element = node;
            let key = element.getAttribute(TranslateConst.TranslateKey);
            if (element instanceof HTMLInputElement) {
                if (element.tagName == 'INPUT'
                    && element.value != undefined
                    && ((element === null || element === void 0 ? void 0 : element.type) || '').toLowerCase() == 'submit') {
                    // find sumbit button
                    this.addNode(new TranslateNodeSubmit(this, element, key), map);
                }
                else if (element.placeholder != undefined && element.placeholder != '') {
                    // find input or textarea placeholder
                    this.addNode(new TranslateNodePlaceholder(this, element, this.findGroup(element), key), map);
                }
            }
            else {
                if (key) {
                    this.addNode(new TranslateNodeText(this, element, this.findGroup(element), key), map);
                }
                else {
                    element.childNodes.forEach((child, i) => {
                        this.scan(child, map, i);
                    });
                }
            }
        }
    }
    scanText(node, map, index = -1) {
        let parent = this.getParent(node);
        if (this.ignore(parent)) {
            return;
        }
        // node is Text
        let key = parent.getAttribute(TranslateConst.TranslateKey);
        this.addNode(new TranslateNodeText(this, parent, this.findGroup(parent), key, index), map);
    }
    addNode(translateNode, map) {
        if (translateNode.match()) {
            this.nodeMap.set(translateNode.getNode(), translateNode);
            if (map) {
                map.set(translateNode.getNode(), translateNode);
            }
        }
    }
    ignore(node) {
        if (node) {
            if (this.ignoreMap.get(node)) {
                return true;
            }
            if (this.translateGroupMap.get(node)) {
                return false;
            }
            if (node == document.documentElement) {
                return false;
            }
            if (node.nodeType == 1) {
                let element = node;
                if (TranslateConst.IgnoreTagArray[element.tagName]) {
                    return true;
                }
                let value = element.getAttribute(TranslateConst.IgnoreAttributeName);
                if (value == undefined || value == 'false') {
                    let ignore = this.ignore(this.getParent(element));
                    if (ignore) {
                        this.ignoreMap.set(element, true);
                    }
                    else {
                        this.translateGroupMap.set(element, element.getAttribute(TranslateConst.TranslateGroup) || TranslateConst.DefaultGroup);
                    }
                    return ignore;
                }
                else {
                    this.ignoreMap.set(element, true);
                    return true;
                }
            }
        }
        return true;
    }
    findGroup(element) {
        while (element != document.documentElement) {
            let group = element.getAttribute(TranslateConst.TranslateGroup);
            if (group) {
                return group;
            }
            element = this.getParent(element);
        }
        return undefined;
    }
    getParent(element) {
        if (element.parentElement != undefined) {
            return element.parentElement;
        }
        if (element.parentNode != undefined) {
            return element.parentNode;
        }
        return undefined;
    }
    doTranslate(map, force = false) {
        this.removeEvents();
        if (force) {
            this.db.clearCache();
        }
        let t = Date.now();
        map.forEach((v, k, m) => {
            if (v.alive()) {
                v.translate();
            }
            else {
                v.destroy();
                m.delete(k);
            }
        });
        console.log('translate count:', map.size, ' time:', Date.now() - t);
        this.addEvents();
    }
    clearRemoveNode() {
        this.doClearRemoveNode();
    }
    clear() {
        this.nodeMap.forEach(node => {
            node.destroy();
        });
        this.nodeMap.clear();
        this.ignoreMap.clear();
        this.translateGroupMap.clear();
    }
}
__decorate([
    Delay(10000)
], TranslateGO.prototype, "clearRemoveNode", null);
