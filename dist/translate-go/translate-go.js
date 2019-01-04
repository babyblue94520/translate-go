import * as tslib_1 from "tslib";
import { Async } from '@cui/core';
import { TranslateConfig, TranslateConst } from './config/translate-config';
import { TranslateDB } from './translate-db';
import { TranslatePlaceholders } from './nodes/translate-placeholders';
import { TranslateSubmits } from './nodes/translate-submits';
import { TranslateTexts } from './nodes/translate-texts';
import { TranslateUtil } from './translate-util';
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
/**
 * 翻譯
 */
var TranslateGO = /** @class */ (function () {
    function TranslateGO() {
        var _this = this;
        this.watch = false;
        this.db = new TranslateDB();
        // 當前語系
        this.currentLanguage = TranslateConfig.defaultLanguage || navigator.language;
        // 需要被翻譯的 Text
        this.translateTexts = new TranslateTexts(this.db);
        // 需要被翻譯的 Input placeholder
        this.translatePlaceholders = new TranslatePlaceholders(this.db);
        // 需要被翻譯的 Input type ="submit"
        this.translateSubmits = new TranslateSubmits(this.db);
        this.translateNodes = [this.translateTexts, this.translatePlaceholders, this.translateSubmits];
        // 保留 window.alert 原本方法
        this.windowAlert = window.alert;
        // 保留 window.confirm 原本方法
        this.windowConfirm = window.confirm;
        // 保留 setAttribute 原本方法
        this.elementSetAttributeOrigin = Element.prototype.setAttribute;
        // 控制 loadTextNodes 只執行一次
        this.notLoadTextNodes = true;
        // 控制 cleanTextNodes 只執行一次
        this.notCleanTextNodes = true;
        /**
         * 攔截alert訊息並翻譯
         */
        this.proxyAlertHanlder = function (text) {
            _this.windowAlert.call(window, _this.getText(text));
        };
        /**
         * 攔截confirm訊息並翻譯
         */
        this.proxyConfirmHanlder = function (text) {
            return _this.windowConfirm.call(window, _this.getText(text));
        };
        /**
         * dom新增node時，找出可翻譯node
         * @param 事件
         */
        this.domNodeInserted = function (e) {
            _this.nodeHandler(e.target);
        };
        /**
         * dom 有異動的時候檢查node文字是否更新
         * @param 事件
         */
        this.domSubtreeModified = function (e) {
            var node = e.target;
            if (_this.translateTexts.need(node)) {
                if (_this.isNonIgnore(node)) {
                    _this.translateTexts.add(node);
                }
            }
            else if (_this.notCleanTextNodes) {
                _this.notCleanTextNodes = false;
                _this.cleanTextNodes();
            }
        };
    }
    /**
     * 是否監控中
     */
    TranslateGO.prototype.isWatch = function () {
        return this.watch;
    };
    TranslateGO.prototype.getTranslateNode = function () {
        return this.translateNodes;
    };
    /**
     * 取得無法翻譯的文字
     */
    TranslateGO.prototype.getNonTranslateText = function () {
        return this.db.getNonTranslate();
    };
    /**
     * 重新載入文字多語資料
     */
    TranslateGO.prototype.reload = function (data) {
        if (data) {
            this.db.insert(data);
        }
        else {
            for (var name_1 in window) {
                if (name_1.indexOf(TranslateConst.GroupPrefix) != -1) {
                    this.db.insert(window[name_1]);
                }
            }
        }
        if (this.watch && this.notLoadTextNodes) {
            this.notLoadTextNodes = false;
            this.loadTextNodes();
        }
    };
    /**
     * 取得當前語系
     */
    TranslateGO.prototype.getLanguage = function () {
        return this.currentLanguage;
    };
    /**
     * 取得當前語系文字
     * @param text
     */
    TranslateGO.prototype.getText = function (text) {
        if (typeof text == 'string') {
            return this.db.translate(text, this.currentLanguage);
        }
        else {
            return text;
        }
    };
    /**
     * 取得當前語系文字
     * @param key
     */
    TranslateGO.prototype.getTextByKey = function (key) {
        return this.db.translateByKey(key, this.currentLanguage);
    };
    /**
     * 依輸入語系進行翻譯
     * @param language
     */
    TranslateGO.prototype.translate = function (language) {
        if (this.currentLanguage == language) {
            return;
        }
        if (this.db.hasLanguage(language)) {
            this.currentLanguage = language;
        }
        this.doTranslate();
    };
    /**
     * 觀察並翻譯
     */
    TranslateGO.prototype.start = function () {
        this.stop();
        this.watch = true;
        this.reload();
        window.alert = this.proxyAlertHanlder;
        window.confirm = this.proxyConfirmHanlder;
        Element.prototype.setAttribute = this.buildProxySetAttribute(this);
        document.addEventListener('DOMNodeInserted', this.domNodeInserted);
        document.addEventListener('DOMSubtreeModified', this.domSubtreeModified);
        document.addEventListener('DOMNodeInsertedIntoDocument', this.domNodeInserted);
    };
    /**
     * 停止觀察和翻譯
     */
    TranslateGO.prototype.stop = function () {
        this.watch = false;
        window.alert = this.windowAlert;
        window.confirm = this.windowConfirm;
        Element.prototype.setAttribute = this.elementSetAttributeOrigin;
        document.removeEventListener('DOMNodeInserted', this.domNodeInserted);
        document.removeEventListener('DOMSubtreeModified', this.domSubtreeModified);
        document.removeEventListener('DOMNodeInsertedIntoDocument', this.domNodeInserted);
    };
    /**
     * 攔截setAttribute
     * @param go
     */
    TranslateGO.prototype.buildProxySetAttribute = function (go) {
        return function (key, value) {
            go.elementSetAttributeOrigin.apply(this, arguments);
            key = key.toLowerCase();
            switch (key) {
                case TranslateConst.Translatekey:
                    if (this instanceof HTMLInputElement) {
                        if (go.translateSubmits.need(this)) {
                            go.translateSubmits.add(this);
                        }
                    }
                    else {
                        this.innerText = value;
                    }
                    break;
                case TranslateConst.PlaceholderTranslatekey:
                    go.translatePlaceholders.add(this);
                    break;
                case TranslateConst.Value:
                    if (go.translateSubmits.need(this)) {
                        go.translateSubmits.add(this);
                    }
                    break;
                case TranslateConst.Type:
                    if (go.translateSubmits.need(this)) {
                        go.translateSubmits.add(this);
                    }
                    break;
            }
        };
    };
    /**
     * 是否非忽略的標籤
     * @param element
     */
    TranslateGO.prototype.isNonIgnore = function (element) {
        if (element) {
            if (element == document.documentElement) {
                return true;
            }
            if (element.nodeType == 3) {
                element = TranslateUtil.getParentElement(element);
            }
            if (element.nodeType == 1) {
                if (TranslateConst.IgnoreTagArray.indexOf(element.tagName) == -1) {
                    if (element.getAttribute(TranslateConst.IgnoreAttributeName) == null) {
                        return this.isNonIgnore(TranslateUtil.getParentElement(element));
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }
        return false;
    };
    /**
     * Node 處理
     * @param node
     * @param handler
     */
    TranslateGO.prototype.nodeHandler = function (node) {
        if (!this.isNonIgnore(node)) {
            return;
        }
        if (this.translateTexts.need(node)) {
            this.translateTexts.add(node);
        }
        else {
            if (this.translatePlaceholders.need(node)) {
                this.translatePlaceholders.add(node);
            }
            else if (this.translateSubmits.need(node)) {
                this.translateSubmits.add(node);
            }
            else {
                var key = node.getAttribute(TranslateConst.Translatekey);
                var text = void 0;
                if (key != undefined) {
                    text = node.innerText;
                    if (text == undefined || text == '') {
                        text = node.innerText = key;
                    }
                }
            }
        }
        this.loopNodes(node.childNodes);
    };
    /**
     * NodeList 處理
     * @param nodes 不重複寫loop
     * @param handler
     */
    TranslateGO.prototype.loopNodes = function (nodes) {
        if (nodes.length == 0) {
            return;
        }
        for (var i = 0, l = nodes.length; i < l; i++) {
            this.nodeHandler(nodes[i]);
        }
    };
    /**
     * 載入需要翻譯的Node
     */
    TranslateGO.prototype.loadTextNodes = function () {
        this.notLoadTextNodes = true;
        if (document.head) {
            this.nodeHandler(document.head);
        }
        if (document.body) {
            this.nodeHandler(document.body);
        }
        this.doTranslate();
    };
    TranslateGO.prototype.cleanTextNodes = function () {
        this.notCleanTextNodes = true;
        this.translateTexts.clean();
        this.translatePlaceholders.clean();
        this.translateSubmits.clean();
    };
    /**
     * 執行翻譯
     */
    TranslateGO.prototype.doTranslate = function () {
        document.removeEventListener('DOMSubtreeModified', this.domSubtreeModified);
        // 翻譯
        this.translateTexts.doTranslate(this.currentLanguage);
        this.translatePlaceholders.doTranslate(this.currentLanguage);
        this.translateSubmits.doTranslate(this.currentLanguage);
        document.addEventListener('DOMSubtreeModified', this.domSubtreeModified);
    };
    tslib_1.__decorate([
        Async(30),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TranslateGO.prototype, "loadTextNodes", null);
    tslib_1.__decorate([
        Async(30),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TranslateGO.prototype, "cleanTextNodes", null);
    return TranslateGO;
}());
export { TranslateGO };
//# sourceMappingURL=translate-go.js.map