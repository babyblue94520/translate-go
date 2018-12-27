var TranslateModule = (function (exports) {
'use strict';

var TranslateUtil = function TranslateUtil () {};

TranslateUtil.getParentElement = function getParentElement (element) {
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
TranslateUtil.isConnected = function isConnected (node) {
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

var TranslateNodes = function TranslateNodes() {
    this._nodes = [];
};
/**
 *
 * @param node
 */
TranslateNodes.prototype.indexOf = function indexOf (node) {
    return this._nodes.indexOf(node);
};
/**
 *
 */
TranslateNodes.prototype.getNodes = function getNodes () {
    return this._nodes;
};
/**
 * 紀錄需要翻譯的node
 * @param node
 */
TranslateNodes.prototype.add = function add (node) {
    this._nodes.push(node);
};
/**
 * 移除需要翻譯的node
 * @param node
 */
TranslateNodes.prototype.remove = function remove (node) {
    var index = this.indexOf(node);
    if (index == -1) {
        return false;
    }
    this._nodes.splice(index, 1);
    return true;
};
TranslateNodes.prototype.clean = function clean () {
    this._nodes = this._nodes.filter(TranslateUtil.isConnected);
};

var PlaceholderTranslateNodes = /*@__PURE__*/(function (TranslateNodes$$1) {
    function PlaceholderTranslateNodes () {
        TranslateNodes$$1.apply(this, arguments);
    }

    if ( TranslateNodes$$1 ) PlaceholderTranslateNodes.__proto__ = TranslateNodes$$1;
    PlaceholderTranslateNodes.prototype = Object.create( TranslateNodes$$1 && TranslateNodes$$1.prototype );
    PlaceholderTranslateNodes.prototype.constructor = PlaceholderTranslateNodes;

    PlaceholderTranslateNodes.prototype.need = function need (node) {
        return node.placeholder != undefined || node.placeholder != '';
    };
    PlaceholderTranslateNodes.prototype.getText = function getText (node) {
        return node.placeholder;
    };
    PlaceholderTranslateNodes.prototype.setText = function setText (node, text) {
        if (text) {
            node.placeholder = text;
        }
    };

    return PlaceholderTranslateNodes;
}(TranslateNodes));

var TextTranslateNodes = /*@__PURE__*/(function (TranslateNodes$$1) {
    function TextTranslateNodes () {
        TranslateNodes$$1.apply(this, arguments);
    }

    if ( TranslateNodes$$1 ) TextTranslateNodes.__proto__ = TranslateNodes$$1;
    TextTranslateNodes.prototype = Object.create( TranslateNodes$$1 && TranslateNodes$$1.prototype );
    TextTranslateNodes.prototype.constructor = TextTranslateNodes;

    TextTranslateNodes.prototype.need = function need (node) {
        return node.nodeType == 3;
    };
    TextTranslateNodes.prototype.getText = function getText (node) {
        return node.data;
    };
    TextTranslateNodes.prototype.setText = function setText (node, text) {
        if (text) {
            node.data = text;
        }
    };

    return TextTranslateNodes;
}(TranslateNodes));

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};

var TranslateConst = {
    Repeat: 'repeat',
    Type: 'type',
    // TranslateSource key name
    Key: 'key',
    // 忽略Key
    IgnoreKeyArray: ['key', 'type', 'repeat'],
    // 忽略標籤
    IgnoreTagArray: ['SCRIPT', 'LINK', 'META', 'STYLE'],
    // 忽略Attribute
    IgnoreAttributeName: 'nottranslate',
    // translate attribute name
    Translatekey: 'translatekey',
    // placeholder translate attribute name
    PlaceholderTranslatekey: 'placeholdertranslatekey',
    // placeholder translate attribute name
    Placeholder: 'placeholder',
    // TranslateGO 在window 中的名稱
    Prefix: '__translateGO',
    // TranslateGO Translate Data在window的前綴
    GroupPrefix: '__translateGO_',
    // TranslateGO 在window 中的名稱
    ConfigPrefix: '__translateGOConfig',
};
if (window[TranslateConst.ConfigPrefix] == undefined) {
    window[TranslateConst.ConfigPrefix] = {
        dev: !environment.production,
        defaultLanguage: 'en'
    };
}
var TranslateConfig = window[TranslateConst.ConfigPrefix];

var TranslateType;
(function (TranslateType) {
    TranslateType[TranslateType["none"] = 0] = "none";
    TranslateType[TranslateType["key"] = 1] = "key";
})(TranslateType || (TranslateType = {}));

/**
 * 翻譯資料庫
 */
var TranslateDB = function TranslateDB() {
    this._startRegexStr = '^([{(＊*\\[\\s\\r\\n]*)';
    this._endRegexStr = '([.。:：;；!！?？=＊*\\]\\s\\r\\n]*)$';
    // 不區分大小寫
    this._modifier = 'i';
    // 清除換行、前後空白
    this._cleanRegex = new RegExp(this._startRegexStr + '|' + this._endRegexStr, 'g');
    // 將文字內的特殊字元跳脫
    this._jumpRegex = new RegExp('([\/\\^$*+?.(){}|\[\]])', 'g');
    // 翻譯資源
    this._wordSource = {};
    // 翻譯資源
    this._keySource = {};
    // 翻譯文字的表示式
    this._wordRegexs = [];
    // 文字對照語系
    this._textLangs = {};
    // 語系資料
    this._langs = [];
    // 無法翻譯資料
    this._cacheNonTranslateText = {};
};
TranslateDB.prototype.getLanguages = function getLanguages () {
    return this._langs;
};
/**
 * 是否有該語系翻譯資料
 * @param language
 */
TranslateDB.prototype.hasLanguage = function hasLanguage (language) {
    return this._langs.indexOf(language) != -1;
};
/**
 * 載入文字多語資料
 * @param data
 */
TranslateDB.prototype.insert = function insert (data) {
    var source;
    var dbSource;
    for (var key in data) {
        source = data[key];
        dbSource = {
            source: source,
            regexps: {},
            replaces: {}
        };
        for (var lang in source) {
            var word = String(source[lang]);
            if (lang == TranslateConst.Key) {
                this._keySource[key] = dbSource;
            }
            else {
                // 處理中間要保留的文字
                var strs = word.split('(.+)');
                if (strs.length > 1) {
                    var replace = '$1';
                    for (var i in strs) {
                        strs[i] = this.getRegexText(strs[i]);
                        replace += strs[i] + '$' + (Number(i) + 2);
                    }
                    dbSource.regexps[lang] = this._wordRegexs[word] = new RegExp(this._startRegexStr + strs.join('(.+)') + this._endRegexStr, this._modifier);
                    dbSource.replaces[lang] = replace;
                }
                else {
                    dbSource.regexps[lang] = this._wordRegexs[word] = new RegExp(this._startRegexStr + this.getRegexText(word) + this._endRegexStr, this._modifier);
                    dbSource.replaces[lang] = '$1' + word + '$2';
                }
                this._wordSource[word] = dbSource;
                this._textLangs[word] = lang;
            }
            if (TranslateConfig.dev) {
                delete this._cacheNonTranslateText[word];
                delete this._cacheNonTranslateText[key];
            }
        }
    }
    if (source) {
        for (var lang$1 in source) {
            if (lang$1 != TranslateConst.Key && this._langs.indexOf(lang$1) == -1) {
                this._langs.push(lang$1);
            }
        }
    }
};
/**
 * 取得無法翻譯的文字
 */
TranslateDB.prototype.getNonTranslate = function getNonTranslate () {
    return this._cacheNonTranslateText;
};
/**
 * 翻譯文字
 * @param text
 * @param language
 */
TranslateDB.prototype.translate = function translate (text, language) {
    var result = text;
    text = String(text);
    if (text.length > 0) {
        var dbSource = this._wordSource[text];
        if (dbSource) {
            return dbSource.source[language] || result;
        }
        var translateSource = this.getTranslateSource(text);
        if (translateSource) {
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
TranslateDB.prototype.translateByKey = function translateByKey (key, language) {
    var result;
    var dbSource = this._keySource[key];
    if (dbSource) {
        result = dbSource.source[language] || result;
        dbSource.currentLanguage = language;
        dbSource.translateText = result;
        dbSource.currentText = result;
    }
    return result;
};
/**
 * 翻譯文字依source
 * @param text
 * @param source
 * @param language
 */
TranslateDB.prototype.translateBySource = function translateBySource (text, source, language) {
    var translateText = source.dbSource.source[language];
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
        // 更新
        source.translateText = translateText;
        source.currentText = text.replace(source.dbSource.regexps[source.currentLanguage], source.dbSource.replaces[language]);
        source.currentLanguage = language;
        return source.currentText;
    }
};
/**
 * 檢查是否需要翻譯並回傳翻譯資料
 * @param text
 */
TranslateDB.prototype.getTranslateSource = function getTranslateSource (text) {
    var textLanguage = this.getTextLanguage(text);
    if (textLanguage) {
        var dbSource = this._wordSource[textLanguage.text];
        if (dbSource) {
            return {
                type: TranslateType.none,
                translateText: textLanguage.text,
                currentLanguage: textLanguage.language,
                dbSource: dbSource,
                currentText: text
            };
        }
    }
};
/**
 * 檢查是否需要翻譯並回傳翻譯資料
 * @param text
 */
TranslateDB.prototype.getTranslateSourceByKey = function getTranslateSourceByKey (key) {
    var dbSource = this._keySource[key];
    if (dbSource) {
        return {
            type: TranslateType.key,
            translateText: null,
            currentLanguage: null,
            dbSource: dbSource,
            currentText: null
        };
    }
    return undefined;
};
/**
 * 檢查是否需要翻譯並回傳翻譯資料
 * 額外記錄沒有key
 * @param text
 */
TranslateDB.prototype.getTranslateSourceAndLogByKey = function getTranslateSourceAndLogByKey (key, text) {
    var result = this.getTranslateSourceByKey(key);
    if (TranslateConfig.dev && result == undefined) {
        this.setCacheNonTranslate(key, text);
    }
    return result;
};
/**
 * 取得文字語系
 * @param text
 */
TranslateDB.prototype.getTextLanguage = function getTextLanguage (text) {
    // 第一次嘗試取得語系
    var language = this._textLangs[text];
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
    language = this._textLangs[cleanText];
    if (language) {
        return {
            language: language,
            text: cleanText
        };
    }
    // 透過表達式找出語系
    var regex;
    for (var word in this._textLangs) {
        regex = this._wordRegexs[word];
        if (regex.test(cleanText)) {
            return {
                language: this._textLangs[word],
                text: word
            };
        }
    }
    if (TranslateConfig.dev && cleanText) {
        var t = cleanText.replace(/[&@#$%^\[\]'"～`~<>,，+-_.。:：;；!！?？{}()=＊*\/\[\]\s\r\n]/g, '');
        // if (isNaN(Number(t)) && !/^[a-zA-Z0-9]+$/.test(t)) {
        if (isNaN(Number(t)) && !/^[0-9]+$/.test(t)) {
            this.setCacheNonTranslate('', cleanText);
        }
    }
};
/**
 * 紀錄無法翻譯資料
 * @param key
 * @param text
 */
TranslateDB.prototype.setCacheNonTranslate = function setCacheNonTranslate (key, text) {
    var source = {};
    source[TranslateConst.Key] = key;
    source[TranslateConfig.defaultLanguage] = text;
    this._cacheNonTranslateText[key || text] = source;
};
/**
 * 移除空白換行
 * @param text
 */
TranslateDB.prototype.getCleanText = function getCleanText (text) {
    // 清除空白
    return text.replace(this._cleanRegex, '');
};
/**
 * 文字內容特殊字元 增加跳脫符號
 * @param text
 */
TranslateDB.prototype.getRegexText = function getRegexText (text) {
    return this.getCleanText(text).replace(this._jumpRegex, '\\$1');
};

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
var TranslateGO = function TranslateGO() {
    var this$1 = this;

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
        this$1.windowAlert.call(window, this$1.getText(text));
    };
    /**
     * 攔截confirm訊息並翻譯
     */
    this.proxyConfirmHanlder = function (text) {
        return this$1.windowConfirm.call(window, this$1.getText(text));
    };
    /**
     * dom新增node時，找出可翻譯node
     * @param 事件
     */
    this.domNodeInserted = function (e) {
        this$1.nodeHandler(e.target);
    };
    /**
     * dom 有異動的時候檢查node文字是否更新
     * @param 事件
     */
    this.domSubtreeModified = function (e) {
        var node = e.target;
        if (this$1.translateTextNodes.need(node) && this$1.isNonIgnore(node)) {
            this$1.modifyAddNode(this$1.translateTextNodes, node);
        }
    };
};
/**
 * 是否監控中
 */
TranslateGO.prototype.isWatch = function isWatch () {
    return this.watch;
};
TranslateGO.prototype.getTranslateNode = function getTranslateNode () {
    return this.translateTextNodes;
};
/**
 * 取得無法翻譯的文字
 */
TranslateGO.prototype.getNonTranslateText = function getNonTranslateText () {
    return this.db.getNonTranslate();
};
/**
 * 重新載入文字多語資料
 */
TranslateGO.prototype.reload = function reload (data) {
    if (data) {
        this.db.insert(data);
    }
    else {
        for (var name in window) {
            if (name.indexOf(TranslateConst.GroupPrefix) != -1) {
                this.db.insert(window[name]);
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
TranslateGO.prototype.getLanguage = function getLanguage () {
    return this.currentLanguage;
};
/**
 * 取得當前語系文字
 * @param text
 */
TranslateGO.prototype.getText = function getText (text) {
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
TranslateGO.prototype.getTextByKey = function getTextByKey (key) {
    return this.db.translateByKey(key, this.currentLanguage);
};
/**
 * 依輸入語系進行翻譯
 * @param language
 */
TranslateGO.prototype.translate = function translate (language) {
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
TranslateGO.prototype.start = function start () {
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
TranslateGO.prototype.stop = function stop () {
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
TranslateGO.prototype.buildProxySetAttribute = function buildProxySetAttribute (go) {
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
TranslateGO.prototype.isNonIgnore = function isNonIgnore (element) {
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
TranslateGO.prototype.nodeHandler = function nodeHandler (node) {
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
TranslateGO.prototype.loopNodes = function loopNodes (nodes) {
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
TranslateGO.prototype.loadTextNodes = function loadTextNodes () {
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
TranslateGO.prototype.doTranslate = function doTranslate () {
    // 翻譯 text
    this.translateTextNodes.clean();
    var nodes = this.translateTextNodes.getNodes();
    for (var i = 0, l = nodes.length; i < l; i++) {
        this.doTranslateNodesSetText(this.translateTextNodes, nodes[i]);
    }
    // 翻譯placeholder
    this.translatePlaceholderNodes.clean();
    nodes = this.translatePlaceholderNodes.getNodes();
    for (var i$1 = 0, l$1 = nodes.length; i$1 < l$1; i$1++) {
        this.doTranslateNodesSetText(this.translatePlaceholderNodes, nodes[i$1]);
    }
};
/**
 * 紀錄需要翻譯的node
 * @param node
 */
TranslateGO.prototype.addNode = function addNode (translateNodes, node) {
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
TranslateGO.prototype.modifyAddNode = function modifyAddNode (translateNodes, node) {
    if (!this.updateNode(translateNodes, node)) {
        if (this.isCanAddNode(node) && this.addTranslateSource(translateNodes, node)) {
            this.doTranslateNodesSetText(translateNodes, node);
            translateNodes.add(node);
        }
        else {
            translateNodes.remove(node);
        }
    }
};
/**
 * 檢查是否需要翻譯
 * @param node
 */
TranslateGO.prototype.isCanAddNode = function isCanAddNode (node) {
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
TranslateGO.prototype.updateNode = function updateNode (translateNodes, node) {
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
TranslateGO.prototype.addTranslateSource = function addTranslateSource (translateNodes, node) {
    var key, text;
    if (node.nodeType == 3) {
        key = TranslateUtil.getParentElement(node).getAttribute(TranslateConst.Translatekey);
        text = node.data;
    }
    else {
        key = node.getAttribute(TranslateConst.Translatekey);
        if (key != undefined && key != '') {
            text = node.innerText;
            if (text == undefined || text == '') {
                text = node.innerText = key;
            }
            key = undefined;
        }
        else {
            key = node.getAttribute(TranslateConst.PlaceholderTranslatekey);
            if (key != undefined) {
                text = node.getAttribute(TranslateConst.Placeholder);
                if (text == undefined || text == '') {
                    text = key;
                    node.setAttribute(TranslateConst.Placeholder, key);
                }
            }
        }
    }
    if (key != undefined) {
        return (node.translateTextSource = this.db.getTranslateSourceAndLogByKey(key, text));
    }
    else {
        text = translateNodes.getText(node);
        if (text == undefined || String(text).length == 0) {
            return false;
        }
        if (/^[a-zA-Z0-9_]+$/.test(text)) {
            node.translateTextSource = this.db.getTranslateSourceByKey(text);
            if (node.translateTextSource) {
                return node.translateTextSource;
            }
        }
        return (node.translateTextSource = this.db.getTranslateSource(text));
    }
};
/**
 * 翻譯
 */
TranslateGO.prototype.doTranslateNodesSetText = function doTranslateNodesSetText (translateNodes, node) {
    var newText = this.db.translateBySource(translateNodes.getText(node), node.translateTextSource, this.currentLanguage);
    translateNodes.setText(node, newText);
};

exports.getTranslateGO = getTranslateGO;
exports.TranslateGO = TranslateGO;

return exports;

}({}));
