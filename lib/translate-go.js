var TranslateModule = (function (exports) {
'use strict';

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
    // TranslateSource value name
    Value: 'value',
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
    this._special = '([$/+?.。:：;；!！?？=＊*(){}|\\-\\^\\[\\]\\s\\r\\n\\\\]*)';
    this._startRegexStr = '^' + this._special;
    this._endRegexStr = this._special + '$';
    // 不區分大小寫
    this._modifier = 'i';
    // 清除前後特殊字元
    this._cleanRegex = new RegExp(this._startRegexStr + '|' + this._endRegexStr, 'g');
    // 清除前特殊字元
    this._cleanStartRegex = new RegExp(this._startRegexStr, 'g');
    // 清除後特殊字元
    this._cleanEndRegex = new RegExp(this._endRegexStr, 'g');
    // 將文字內的特殊字元跳脫
    this._jumpRegex = new RegExp('([$/*+?.(){}|\\^\\[\\]\\\\])', 'g');
    // 翻譯資源
    this._wordSource = {};
    // 翻譯資源
    this._keySource = {};
    // 翻譯文字的表示式
    this._wordRegexs = {};
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
            var cleanWord = (void 0);
            if (lang == TranslateConst.Key) {
                this._keySource[key] = dbSource;
            }
            else {
                // 處理中間要保留的文字
                var strs = word.split('(.+)');
                if (strs.length > 1) {
                    var replace = '$1';
                    strs[0] = this.getRegexWord(strs[0].replace(this._cleanStartRegex, ''));
                    replace += strs[0] + '$2';
                    var i = 1, l = strs.length - 1;
                    for (; i < l; i++) {
                        strs[i] = this.getRegexWord(strs[i]);
                        replace += strs[i] + '$' + (i + 2);
                    }
                    if (i < strs.length) {
                        strs[i] = this.getRegexWord(strs[i].replace(this._cleanEndRegex, ''));
                        replace += strs[i] + '$' + (i + 2);
                    }
                    dbSource.regexps[lang] = this._wordRegexs[word] = new RegExp(this._startRegexStr + strs.join('(.+)') + this._endRegexStr, this._modifier);
                    dbSource.replaces[lang] = replace;
                }
                else {
                    cleanWord = this.cleanWord(word);
                    dbSource.regexps[lang] = this._wordRegexs[word] = new RegExp(this._startRegexStr + this.getRegexWord(cleanWord) + this._endRegexStr, this._modifier);
                    dbSource.replaces[lang] = '$1' + cleanWord + '$2';
                }
                this._wordSource[word] = dbSource;
                this._textLangs[word] = lang;
            }
            if (TranslateConfig.dev) {
                if (cleanWord != undefined) {
                    delete this._cacheNonTranslateText[cleanWord];
                }
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
    var cleanText = this.cleanWord(text);
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
        if (isNaN(Number(cleanText)) && !/^[0-9]+$/.test(cleanText)) {
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
TranslateDB.prototype.cleanWord = function cleanWord (text) {
    // 清除空白
    return text.replace(this._cleanRegex, '');
};
/**
 * 文字內容特殊字元 增加跳脫符號
 * @param text
 */
TranslateDB.prototype.getRegexWord = function getRegexWord (text) {
    return text.replace(this._jumpRegex, '\\$1');
};

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
    var connected;
    if (node.isConnected == undefined) {
        var parent = TranslateUtil.getParentElement(node);
        if (!parent) {
            connected = false;
        }
        if (node == document.body || parent == document.body) {
            connected = true;
        }
        else {
            connected = TranslateUtil.isConnected(parent);
        }
    }
    else {
        connected = node.isConnected;
    }
    if (!connected) {
        node.translateTextSource = undefined;
    }
    return connected;
};

var TranslateNodes = function TranslateNodes(db) {
    this.db = db;
    this._nodes = [];
};
/**
 * 新增可翻譯物件
 * @param node
 */
TranslateNodes.prototype.add = function add (node) {
    if (node.translateTextSource) {
        if (node.translateTextSource.currentText != this.getText(node)
            && this.addSource(node)) {
            this.doSetText(node);
        }
    }
    else if (this.addSource(node)) {
        this.doSetText(node);
        this._nodes.push(node);
    }
};
/**
 * 移除需要翻譯的node
 * @param node
 */
TranslateNodes.prototype.remove = function remove (node) {
    var index = this._nodes.indexOf(node);
    if (index == -1) {
        return false;
    }
    node.translateTextSource = undefined;
    this._nodes.splice(index, 1);
    return true;
};
/**
 * 回傳所有可以翻譯的物件
 */
TranslateNodes.prototype.getNodes = function getNodes () {
    return this._nodes;
};
/**
 * 清除已經移除在畫面的物件
 */
TranslateNodes.prototype.clean = function clean () {
    this._nodes = this._nodes.filter(TranslateUtil.isConnected);
};
/**
 * 翻譯文字依source
 * @param text
 * @param source
 * @param language
 */
TranslateNodes.prototype.translateBySource = function translateBySource (text, source, language) {
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
 * 根據語系翻譯
 * @param lang
 */
TranslateNodes.prototype.doTranslate = function doTranslate (lang) {
    this._lang = lang;
    for (var i = 0, l = this._nodes.length; i < l; i++) {
        this.doSetText(this._nodes[i]);
    }
};
/**
 * 為物件增加翻譯資料
 * @param node
 */
TranslateNodes.prototype.addSource = function addSource (node) {
    var keyText = this.findKeyText(node);
    if (keyText) {
        if (keyText.key != undefined) {
            return (node.translateTextSource = this.db.getTranslateSourceAndLogByKey(keyText.key, keyText.text));
        }
        else {
            keyText.text = this.getText(node);
            if (keyText.text == undefined || String(keyText.text).length == 0) {
                return false;
            }
            if (/^\w*$/.test(keyText.text)) {
                node.translateTextSource = this.db.getTranslateSourceByKey(keyText.text);
                if (node.translateTextSource) {
                    return node.translateTextSource;
                }
            }
            return (node.translateTextSource = this.db.getTranslateSource(keyText.text));
        }
    }
};
/**
 * 更新翻譯物件的文字
 * @param node
 */
TranslateNodes.prototype.doSetText = function doSetText (node) {
    var newText = this.db.translateBySource(this.getText(node), node.translateTextSource, this._lang);
    this.setText(node, newText);
};

var TranslatePlaceholders = /*@__PURE__*/(function (TranslateNodes$$1) {
    function TranslatePlaceholders () {
        TranslateNodes$$1.apply(this, arguments);
    }

    if ( TranslateNodes$$1 ) TranslatePlaceholders.__proto__ = TranslateNodes$$1;
    TranslatePlaceholders.prototype = Object.create( TranslateNodes$$1 && TranslateNodes$$1.prototype );
    TranslatePlaceholders.prototype.constructor = TranslatePlaceholders;

    TranslatePlaceholders.prototype.need = function need (node) {
        return (node.placeholder != undefined && node.placeholder != '') || node.getAttribute(TranslateConst.PlaceholderTranslatekey) != undefined;
    };
    TranslatePlaceholders.prototype.getText = function getText (node) {
        return node.placeholder;
    };
    TranslatePlaceholders.prototype.setText = function setText (node, text) {
        if (text) {
            node.placeholder = text;
        }
    };
    TranslatePlaceholders.prototype.findKeyText = function findKeyText (node) {
        var key = node.getAttribute(TranslateConst.PlaceholderTranslatekey);
        var text;
        if (key != undefined) {
            text = node.getAttribute(TranslateConst.Placeholder);
            if (text == undefined || text == '') {
                text = key;
                node.setAttribute(TranslateConst.Placeholder, key);
            }
        }
        return {
            key: key,
            text: text
        };
    };

    return TranslatePlaceholders;
}(TranslateNodes));

var TranslateSubmits = /*@__PURE__*/(function (TranslateNodes$$1) {
    function TranslateSubmits () {
        TranslateNodes$$1.apply(this, arguments);
    }

    if ( TranslateNodes$$1 ) TranslateSubmits.__proto__ = TranslateNodes$$1;
    TranslateSubmits.prototype = Object.create( TranslateNodes$$1 && TranslateNodes$$1.prototype );
    TranslateSubmits.prototype.constructor = TranslateSubmits;

    TranslateSubmits.prototype.need = function need (node) {
        return node.type && node.type.toLowerCase() == 'submit' && (node.value != undefined || node.getAttribute(TranslateConst.Translatekey) != undefined);
    };
    TranslateSubmits.prototype.getText = function getText (node) {
        return node.value;
    };
    TranslateSubmits.prototype.setText = function setText (node, text) {
        if (text) {
            node.value = text;
        }
    };
    TranslateSubmits.prototype.findKeyText = function findKeyText (node) {
        return {
            key: node.getAttribute(TranslateConst.Translatekey),
            text: node.value
        };
    };

    return TranslateSubmits;
}(TranslateNodes));

var TranslateTexts = /*@__PURE__*/(function (TranslateNodes$$1) {
    function TranslateTexts () {
        TranslateNodes$$1.apply(this, arguments);
    }

    if ( TranslateNodes$$1 ) TranslateTexts.__proto__ = TranslateNodes$$1;
    TranslateTexts.prototype = Object.create( TranslateNodes$$1 && TranslateNodes$$1.prototype );
    TranslateTexts.prototype.constructor = TranslateTexts;

    TranslateTexts.prototype.need = function need (node) {
        return node.nodeType == 3;
    };
    TranslateTexts.prototype.getText = function getText (node) {
        return node.data;
    };
    TranslateTexts.prototype.setText = function setText (node, text) {
        if (text) {
            node.data = text;
        }
    };
    TranslateTexts.prototype.findKeyText = function findKeyText (node) {
        return {
            key: TranslateUtil.getParentElement(node).getAttribute(TranslateConst.Translatekey),
            text: node.data
        };
    };

    return TranslateTexts;
}(TranslateNodes));

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
        if (this$1.translateTexts.need(node)) {
            if (this$1.isNonIgnore(node)) {
                this$1.translateTexts.add(node);
            }
        }
        else if (this$1.notCleanTextNodes) {
            this$1.notCleanTextNodes = false;
            setTimeout(this$1.cleanTextNodes, 30);
        }
    };
    /**
     * 載入需要翻譯的Node
     */
    this.loadTextNodes = function () {
        this$1.notLoadTextNodes = true;
        if (document.head) {
            this$1.nodeHandler(document.head);
        }
        if (document.body) {
            this$1.nodeHandler(document.body);
        }
        this$1.doTranslate();
    };
    /**
     * 清除已經不在畫面上翻譯物件
     */
    this.cleanTextNodes = function () {
        this$1.notCleanTextNodes = true;
        this$1.translateTexts.clean();
        this$1.translatePlaceholders.clean();
        this$1.translateSubmits.clean();
    };
};
/**
 * 是否監控中
 */
TranslateGO.prototype.isWatch = function isWatch () {
    return this.watch;
};
TranslateGO.prototype.getTranslateNode = function getTranslateNode () {
    return this.translateNodes;
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
    if (this.watch && this.notLoadTextNodes) {
        this.notLoadTextNodes = false;
        setTimeout(this.loadTextNodes, 30);
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
    }
    this.doTranslate();
};
/**
 * 觀察並翻譯
 */
TranslateGO.prototype.start = function start () {
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
            var text;
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
TranslateGO.prototype.loopNodes = function loopNodes (nodes) {
    if (nodes.length == 0) {
        return;
    }
    for (var i = 0, l = nodes.length; i < l; i++) {
        this.nodeHandler(nodes[i]);
    }
};
/**
 * 執行翻譯
 */
TranslateGO.prototype.doTranslate = function doTranslate () {
    document.removeEventListener('DOMSubtreeModified', this.domSubtreeModified);
    // 翻譯
    this.translateTexts.doTranslate(this.currentLanguage);
    this.translatePlaceholders.doTranslate(this.currentLanguage);
    this.translateSubmits.doTranslate(this.currentLanguage);
    document.addEventListener('DOMSubtreeModified', this.domSubtreeModified);
};

exports.getTranslateGO = getTranslateGO;
exports.TranslateGO = TranslateGO;

return exports;

}({}));
