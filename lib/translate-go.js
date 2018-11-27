var TranslateModule = (function (exports) {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var TranslateUtil = /** @class */ (function () {
    function TranslateUtil() {
    }
    /**
     * 取得父層
     * @param element
     */
    TranslateUtil.getParentElement = function (element) {
        if (element.parentElement != undefined) {
            return element.parentElement;
        }
        if (element.parentNode != undefined) {
            return element.parentNode;
        }
        return undefined;
    };
    /**
     * 檢查HTMLElement是否渲染在body上
     * @param element
     */
    TranslateUtil.isConnected = function (node) {
        if (!node) {
            return false;
        }
        if (node.isConnected == undefined) {
            var parent = TranslateUtil.getParentElement(node);
            if (!parent) {
                return false;
            }
            if (node == document.body || parent == document.body) {
                return true;
            }
            else {
                return TranslateUtil.isConnected(parent);
            }
        }
        else {
            return node.isConnected;
        }
    };
    return TranslateUtil;
}());

var TranslateNodes = /** @class */ (function () {
    function TranslateNodes() {
        this._nodes = [];
    }
    /**
     *
     * @param node
     */
    TranslateNodes.prototype.indexOf = function (node) {
        return this._nodes.indexOf(node);
    };
    /**
     *
     */
    TranslateNodes.prototype.getNodes = function () {
        return this._nodes;
    };
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    TranslateNodes.prototype.add = function (node) {
        this._nodes.push(node);
    };
    /**
     * 移除需要翻譯的node
     * @param node
     */
    TranslateNodes.prototype.remove = function (node) {
        var index = this.indexOf(node);
        if (index == -1) {
            return false;
        }
        this._nodes.splice(index, 1);
        return true;
    };
    TranslateNodes.prototype.clean = function () {
        this._nodes = this._nodes.filter(TranslateUtil.isConnected);
    };
    return TranslateNodes;
}());

var PlaceholderTranslateNodes = /** @class */ (function (_super) {
    __extends(PlaceholderTranslateNodes, _super);
    function PlaceholderTranslateNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaceholderTranslateNodes.prototype.need = function (node) {
        return node.placeholder != undefined || node.placeholder != '';
    };
    PlaceholderTranslateNodes.prototype.getText = function (node) {
        return node.placeholder;
    };
    PlaceholderTranslateNodes.prototype.setText = function (node, text) {
        if (text) {
            node.placeholder = text;
        }
    };
    return PlaceholderTranslateNodes;
}(TranslateNodes));

var TextTranslateNodes = /** @class */ (function (_super) {
    __extends(TextTranslateNodes, _super);
    function TextTranslateNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextTranslateNodes.prototype.need = function (node) {
        return node.nodeType == 3;
    };
    TextTranslateNodes.prototype.getText = function (node) {
        return node.data;
    };
    TextTranslateNodes.prototype.setText = function (node, text) {
        if (text) {
            node.data = text;
        }
    };
    return TextTranslateNodes;
}(TranslateNodes));

var TranslateConst = /** @class */ (function () {
    function TranslateConst() {
    }
    TranslateConst.Repeat = 'repeat';
    TranslateConst.Type = 'type';
    // TranslateSource key name
    TranslateConst.Key = 'key';
    // 忽略Key
    TranslateConst.IgnoreKeyArray = ['key', 'type', 'repeat'];
    // 忽略標籤
    TranslateConst.IgnoreTagArray = ['SCRIPT', 'LINK', 'META', 'STYLE'];
    // 忽略Attribute
    TranslateConst.IgnoreAttributeName = 'nottranslate';
    // translate attribute name
    TranslateConst.Translatekey = 'translatekey';
    // placeholder translate attribute name
    TranslateConst.PlaceholderTranslatekey = 'placeholdertranslatekey';
    // TranslateGO 在window 中的名稱
    TranslateConst.Prefix = '__translateGO';
    // TranslateGO Translate Data在window的前綴
    TranslateConst.GroupPrefix = TranslateConst.Prefix + '_';
    // TranslateGO 在window 中的名稱
    TranslateConst.ConfigPrefix = '__translateConfig';
    return TranslateConst;
}());
var TranslateConfig = {
    dev: false,
    defaultLanguage: 'en'
};
window[TranslateConst.ConfigPrefix] = TranslateConfig;

var TranslateType;
(function (TranslateType) {
    TranslateType[TranslateType["none"] = 0] = "none";
    TranslateType[TranslateType["key"] = 1] = "key";
})(TranslateType || (TranslateType = {}));

/**
 * 翻譯資料庫
 */
var TranslateDB = /** @class */ (function () {
    function TranslateDB() {
        // 盡量搜尋純文字的內容
        this._specialChars = '[.。:：;；!！?？{}()=＊*\\[\\]\\s\\r\\n]';
        this._startRegexStr = '(^[{(＊*\\[\\s\\r\\n]?)';
        this._endRegexStr = '([.。:：;；!！?？=＊*\\]\\s\\r\\n]?$)';
        // 換行等等
        this._cleanChars = '[\\r\\n]';
        // 不區分大小寫
        this._modifier = 'i';
        // 清除空白換行
        this._cleanRegex = new RegExp(this._cleanChars + '+', 'g');
        // 文字內的特殊字元 Regexp
        this._textReplaceSpecialCharsRegex = new RegExp('(' + this._specialChars + ')', 'g');
        // 翻譯資源
        this._wordSource = {};
        // 翻譯資源
        this._keySource = {};
        // 翻譯文字的表示式
        this._wordRegexs = [];
        // 文字對照語系
        this._textLanguageData = {};
        // 語系資料
        this._langs = [];
        // 無法翻譯資料
        this._cacheNonTranslateText = {};
    }
    TranslateDB.prototype.getLanguages = function () {
        return this._langs;
    };
    /**
     * 是否有該語系翻譯資料
     * @param language
     */
    TranslateDB.prototype.hasLanguage = function (language) {
        return this._langs.indexOf(language) != -1;
    };
    /**
     * 載入文字多語資料
     * @param data
     */
    TranslateDB.prototype.insert = function (data) {
        var this$1 = this;

        var source;
        for (var key in data) {
            source = data[key];
            for (var lang in source) {
                var word = String(source[lang]);
                if (lang == TranslateConst.Key) {
                    this$1._keySource[key] = source;
                }
                else {
                    this$1._wordSource[word] = source;
                    this$1._wordRegexs[word] = new RegExp(this$1._startRegexStr + this$1.getRegexText(word) + this$1._endRegexStr, this$1._modifier);
                    this$1._textLanguageData[word] = lang;
                    if (TranslateConfig.dev) {
                        delete this$1._cacheNonTranslateText[word];
                    }
                }
            }
        }
        if (source) {
            for (var lang in source) {
                if (lang != TranslateConst.Key && this$1._langs.indexOf(lang) == -1) {
                    this$1._langs.push(lang);
                }
            }
        }
    };
    /**
     * 取得無法翻譯的文字
     */
    TranslateDB.prototype.getNonTranslate = function () {
        return this._cacheNonTranslateText;
    };
    /**
     * 翻譯文字
     * @param text
     * @param language
     */
    TranslateDB.prototype.translate = function (text, language) {
        var result = text;
        text = String(text);
        if (text.length > 0) {
            var source = this.getWordSource(text);
            if (source) {
                return source[language] || result;
            }
            var translateSource = this.getTranslateSource(text);
            if (source) {
                return this.translateBySource(text, translateSource, language) || result;
            }
        }
        return result;
    };
    /**
     * 翻譯文字依Key
     * @param key
     * @param language
     */
    TranslateDB.prototype.translateByKey = function (key, language) {
        var result;
        var source = this._keySource[key];
        if (source) {
            result = source[language] || result;
            source.currentLanguage = language;
            source.translateText = result;
            source.currentText = result;
        }
        return result;
    };
    /**
     * 翻譯文字依source
     * @param text
     * @param source
     * @param language
     */
    TranslateDB.prototype.translateBySource = function (text, source, language) {
        var translateText = source.wordSource[language];
        if (source.type == TranslateType.key) {
            source.currentLanguage = language;
            source.translateText = translateText;
            source.currentText = translateText;
            return translateText;
        }
        else {
            if (translateText == undefined) {
                return;
            }
            var regex = source.translateRegexs[source.currentLanguage];
            // 更新
            source.currentLanguage = language;
            source.translateText = translateText;
            source.currentText = text.replace(regex, '$1' + translateText + '$2');
            return source.currentText;
        }
    };
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    TranslateDB.prototype.getTranslateSource = function (text) {
        var this$1 = this;

        var textLanguage = this.getTextLanguage(text);
        if (textLanguage) {
            var translateRegexs = {};
            var wordSource = this.getWordSource(textLanguage.text);
            if (wordSource) {
                for (var lang in wordSource) {
                    translateRegexs[lang] = this$1.getWordRegex(wordSource[lang]);
                }
                return {
                    type: TranslateType.none,
                    translateText: textLanguage.text,
                    currentLanguage: textLanguage.language,
                    wordSource: wordSource,
                    translateRegexs: translateRegexs,
                    currentText: text
                };
            }
        }
    };
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    TranslateDB.prototype.getTranslateSourceByKey = function (key) {
        var source = this._keySource[key];
        if (source) {
            return {
                type: TranslateType.key,
                translateText: null,
                currentLanguage: null,
                wordSource: source,
                translateRegexs: null,
                currentText: null
            };
        }
        return undefined;
    };
    /**
     * 取得文字語系
     * @param text
     */
    TranslateDB.prototype.getTextLanguage = function (text) {
        var this$1 = this;

        // 第一次嘗試取得語系
        var language = this._textLanguageData[text];
        if (language) {
            return {
                language: language,
                text: text
            };
        }
        // 清除文字特殊字元
        var cleanText = this.getCleanText(text);
        if (cleanText.length == 0) {
            return;
        }
        // 第二次嘗試取得語系
        language = this._textLanguageData[cleanText];
        if (language) {
            return {
                language: language,
                text: cleanText
            };
        }
        // 透過表達式找出語系
        var regex;
        for (var word in this$1._textLanguageData) {
            regex = this$1.getWordRegex(word);
            if (regex.test(cleanText)) {
                return {
                    language: this$1._textLanguageData[word],
                    text: word
                };
            }
        }
        if (TranslateConfig.dev && cleanText) {
            var t = cleanText.replace(/[&@#$%^\[\]'"～`~<>,，+-_.。:：;；!！?？{}()=＊*\/\[\]\s\r\n]/g, '');
            // if (isNaN(Number(t)) && !/^[a-zA-Z0-9]+$/.test(t)) {
            if (isNaN(Number(t)) && !/^[0-9]+$/.test(t)) {
                this._cacheNonTranslateText[cleanText] = false;
            }
        }
    };
    /**
     * 取得文字翻譯資源
     * @param word
     */
    TranslateDB.prototype.getWordSource = function (word) {
        return this._wordSource[word];
    };
    /**
     * 取得文字表達式
     * @param word
     */
    TranslateDB.prototype.getWordRegex = function (word) {
        return this._wordRegexs[word];
    };
    /**
     * 移除空白換行
     * @param text
     */
    TranslateDB.prototype.getCleanText = function (text) {
        if (text) {
            // 清除空白
            return text.replace(this._cleanRegex, '').replace(/(^[\s]+|[\s]+$)/g, '');
        }
        return text;
    };
    /**
     * 文字內容特殊字元 增加跳脫符號
     * @param text
     */
    TranslateDB.prototype.getRegexText = function (text) {
        return text.replace(this._textReplaceSpecialCharsRegex, '\\$1');
    };
    return TranslateDB;
}());

/**
 * 取得TranslateGO
 */
function getTranslateGO() {
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
        // 需要被翻譯的Node
        this.translateTextNodes = new TextTranslateNodes();
        this.translatePlaceholderNodes = new PlaceholderTranslateNodes();
        this.windowAlert = window.alert;
        this.windowConfirm = window.confirm;
        this.elementSetAttributeOrigin = Element.prototype.setAttribute;
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
            if (_this.translateTextNodes.need(node) && _this.isNonIgnore(node)) {
                _this.modifyAddNode(_this.translateTextNodes, node);
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
        return this.translateTextNodes;
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
        var this$1 = this;

        if (data) {
            this.db.insert(data);
        }
        else {
            for (var name in window) {
                if (name.indexOf(TranslateConst.GroupPrefix) != -1) {
                    this$1.db.insert(window[name]);
                }
            }
        }
        if (this.watch) {
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
            this.doTranslate();
        }
    };
    /**
     * 觀察並翻譯
     */
    TranslateGO.prototype.start = function () {
        this.stop();
        this.watch = true;
        this.reload();
        this.doTranslate();
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
            if (key == TranslateConst.Translatekey) {
                this.innerText = value;
            }
            else if (key == TranslateConst.PlaceholderTranslatekey) {
                go.addNode(go.translatePlaceholderNodes, this);
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
        if (this.isNonIgnore(node)) {
            if (this.translateTextNodes.need(node)) {
                this.addNode(this.translateTextNodes, node);
            }
            else if (this.translatePlaceholderNodes.need(node)) {
                this.addNode(this.translatePlaceholderNodes, node);
            }
            this.loopNodes(node.childNodes);
        }
    };
    /**
     * NodeList 處理
     * @param nodes 不重複寫loop
     * @param handler
     */
    TranslateGO.prototype.loopNodes = function (nodes) {
        var this$1 = this;

        if (nodes.length == 0) {
            return;
        }
        for (var i = 0, l = nodes.length; i < l; i++) {
            this$1.nodeHandler(nodes[i]);
        }
    };
    /**
     * 載入需要翻譯的Node
     */
    TranslateGO.prototype.loadTextNodes = function () {
        if (document.head) {
            this.nodeHandler(document.head);
        }
        if (document.body) {
            this.nodeHandler(document.body);
        }
    };
    /**
     * 執行翻譯
     */
    TranslateGO.prototype.doTranslate = function () {
        var this$1 = this;

        // 翻譯 text
        this.translateTextNodes.clean();
        var nodes = this.translateTextNodes.getNodes();
        for (var i = 0, l = nodes.length; i < l; i++) {
            this$1.doTranslateNodesSetText(this$1.translateTextNodes, nodes[i]);
        }
        // 翻譯placeholder
        this.translatePlaceholderNodes.clean();
        nodes = this.translatePlaceholderNodes.getNodes();
        for (var i = 0, l = nodes.length; i < l; i++) {
            this$1.doTranslateNodesSetText(this$1.translatePlaceholderNodes, nodes[i]);
        }
    };
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    TranslateGO.prototype.addNode = function (translateNodes, node) {
        if (!this.updateNode(translateNodes, node)) {
            if (this.addTranslateSource(translateNodes, node)) {
                this.doTranslateNodesSetText(translateNodes, node);
                translateNodes.add(node);
            }
        }
    };
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    TranslateGO.prototype.modifyAddNode = function (translateNodes, node) {
        if (!this.updateNode(translateNodes, node)) {
            if (this.isCanAddNode(node) && this.addTranslateSource(translateNodes, node)) {
                this.doTranslateNodesSetText(translateNodes, node);
                translateNodes.add(node);
            }
        }
    };
    /**
     * 檢查是否需要翻譯
     * @param node
     */
    TranslateGO.prototype.isCanAddNode = function (node) {
        var parent = node;
        while ((parent = TranslateUtil.getParentElement(parent)) != document.documentElement) {
            if (parent.getAttribute(TranslateConst.IgnoreAttributeName) != null) {
                return false;
            }
        }
        return true;
    };
    /**
     * 更新翻譯
     * @param translateNodes
     * @param node
     */
    TranslateGO.prototype.updateNode = function (translateNodes, node) {
        // 檢查當前文字跟當前應該翻譯文字是否相同
        if (node.translateTextSource) {
            if (node.translateTextSource.currentText == translateNodes.getText(node)) {
                return true;
            }
            // 更新翻譯檔
            if (this.addTranslateSource(translateNodes, node)) {
                this.doTranslateNodesSetText(translateNodes, node);
                return true;
            }
        }
        return false;
    };
    /**
     * 為node新增翻譯檔
     * @param node
     */
    TranslateGO.prototype.addTranslateSource = function (translateNodes, node) {
        var key;
        if (node.nodeType == 3) {
            key = TranslateUtil.getParentElement(node).getAttribute(TranslateConst.Translatekey);
        }
        else {
            key = node.getAttribute(TranslateConst.Translatekey);
            if (key) {
                node.innerText = key;
                key = null;
            }
            else {
                key = TranslateUtil.getParentElement(node).getAttribute(TranslateConst.PlaceholderTranslatekey);
            }
        }
        if (key != null) {
            return (node.translateTextSource = this.db.getTranslateSourceByKey(key));
        }
        else {
            var text = translateNodes.getText(node);
            if (text == undefined || String(text).length == 0) {
                return false;
            }
            return (node.translateTextSource = this.db.getTranslateSource(text));
        }
    };
    /**
     * 翻譯
     */
    TranslateGO.prototype.doTranslateNodesSetText = function (translateNodes, node) {
        var newText = this.db.translateBySource(translateNodes.getText(node), node.translateTextSource, this.currentLanguage);
        translateNodes.setText(node, newText);
    };
    return TranslateGO;
}());

exports.getTranslateGO = getTranslateGO;
exports.TranslateGO = TranslateGO;

return exports;

}({}));
