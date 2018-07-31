var TranslateModule = (function (exports) {
'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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
        // tslint:disable-next-line:curly
        if (index == -1)
            { return false; }
        this._nodes.splice(index, 1);
        return true;
    };
    TranslateNodes.prototype.clean = function () {
        this._nodes = this._nodes.filter(this.cleanFilterHandler);
    };
    TranslateNodes.prototype.cleanFilterHandler = function (node) {
        // tslint:disable-next-line:curly
        return node && node.isConnected;
    };
    return TranslateNodes;
}());

var PlaceholderTranslateNodes = /** @class */ (function (_super) {
    __extends(PlaceholderTranslateNodes, _super);
    function PlaceholderTranslateNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaceholderTranslateNodes.prototype.need = function (node) {
        return (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA') && node.placeholder;
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

var TranslateType;
(function (TranslateType) {
    TranslateType[TranslateType["none"] = 0] = "none";
    TranslateType[TranslateType["key"] = 1] = "key";
})(TranslateType || (TranslateType = {}));

/**
 * 翻譯資料庫
 */
var TranslateDB = /** @class */ (function () {
    function TranslateDB(_dev) {
        this._dev = _dev;
        // 盡量搜尋純文字的內容
        this._specialChars = '[.。:：;；!！?？{}()=＊*\\[\\]\\s\\r\\n]';
        this._startRegexStr = '([{(＊*\\[\\s\\r\\n]?^)';
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

        console.log('_loadLanguageData start');
        var t = performance.now();
        var word, source;
        var langData;
        for (var lang in data) {
            if (this$1._langs.indexOf(lang) == -1) {
                this$1._langs.push(lang);
            }
            langData = data[lang];
            for (var key in langData) {
                word = langData[key];
                source = this$1._keySource[key];
                if (!source) {
                    source = this$1._keySource[key] = {};
                }
                source[lang] = word;
                this$1._wordSource[word] = source;
                this$1._wordRegexs[word] = new RegExp(this$1._startRegexStr + this$1.getRegexText(word) + this$1._endRegexStr, this$1._modifier);
                this$1._textLanguageData[word] = lang;
            }
        }
        console.log('_loadLanguageData end', (performance.now() - t));
    };
    /**
     * 取得無法翻譯的文字
     */
    TranslateDB.prototype.getNonTranslate = function () {
        var this$1 = this;

        var result = {};
        var langs = this._langs.length > 0 ? this._langs : ['zh_TW'];
        var count = 0;
        for (var i in langs) {
            result[langs[i]] = {};
            count = 0;
            for (var text in this$1._cacheNonTranslateText) {
                result[langs[i]][count++] = text;
            }
        }
        return result;
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
            var regex = source.translateRegexs[source.currentLanguage];
            if (translateText == undefined) {
                return;
            }
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
        return {
            type: TranslateType.key,
            translateText: null,
            currentLanguage: null,
            wordSource: this._keySource[key],
            translateRegexs: null,
            currentText: null
        };
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
        if (this._dev && cleanText) {
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

var TranslateToolBar = /** @class */ (function () {
    // private toolUrl = "http://127.0.0.1:4300/#/Index";
    // private toolOrigin = "http://127.0.0.1:4300";
    function TranslateToolBar(translateGO) {
        var _this = this;
        this.translateGO = translateGO;
        this.toolUrl = "https://babyblue94520.github.io/translate-go-tool/dist/#/Index";
        this.toolOrigin = "https://babyblue94520.github.io";
        this.start = function (e) {
            _this.translateGO.watch();
            _this.status(true);
        };
        this.stop = function (e) {
            _this.translateGO.stop();
            _this.status(false);
        };
        this.languageChange = function (e) {
            _this.translateGO.translate(_this._languageSelect.value);
        };
        this.openTool = function (e) {
            if (!_this.toolWindow || _this.toolWindow.closed) {
                _this.toolWindow = window.open(_this.toolUrl, _this.toolOrigin);
                setTimeout(function () {
                    _this.toolWindow.postMessage(_this.translateGO.getNonTranslateText(), _this.toolOrigin);
                }, 2000);
            }
            else {
                _this.toolWindow.focus();
            }
        };
        this.postNonText = function (e) {
            if (_this.toolWindow) {
                _this.toolWindow.postMessage(_this.translateGO.getNonTranslateText(), _this.toolOrigin);
                _this.toolWindow.focus();
            }
        };
        this.status = function (isStart) {
            if (isStart) {
                _this._startWatchButton.disabled = true;
                _this._stopWatchButton.disabled = false;
            }
            else {
                _this._startWatchButton.disabled = false;
                _this._stopWatchButton.disabled = true;
            }
        };
        this.updateLanaguageOption = function (array) {
            if (_this._languageSelect) {
                _this._languageSelect.innerHTML = '';
                var option = void 0, lang = void 0;
                for (var i in array) {
                    lang = array[i];
                    option = document.createElement('option');
                    option.value = lang;
                    option.innerText = lang;
                    _this._languageSelect.appendChild(option);
                }
            }
        };
        this.changeLanaguage = function (lang) {
            _this._languageSelect.value = lang;
        };
        var style = document.createElement('style');
        style.innerHTML = [
            '.translate-toolbar{',
            'position: fixed;z-index: 999;bottom: 0px;left: 0;',
            '}',
            '.translate-toolbar>button,.translate-toolbar>select{',
            'padding: 10px;margin: 5px;display: inline-block; box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px, rgba(0, 0, 0, 0.22) 0px 3px 10px;',
            '}',
            '.translate-toolbar>button:disabled,.translate-toolbar>select:disabled{',
            'background-color:#fff;color:#ccc;',
            'box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px',
            '}'
        ].join('');
        document.head.appendChild(style);
        this._element = document.createElement('div');
        this._element.className = 'translate-toolbar';
        this._element.setAttribute('notTranslate', '');
        this._languageSelect = document.createElement('select');
        this._languageSelect.addEventListener('change', this.languageChange);
        this._startWatchButton = document.createElement('button');
        this._startWatchButton.innerText = 'start';
        this._startWatchButton.addEventListener('click', this.start);
        this._stopWatchButton = document.createElement('button');
        this._stopWatchButton.innerText = 'stop';
        this._stopWatchButton.addEventListener('click', this.stop);
        this._openToolWindowButton = document.createElement('button');
        this._openToolWindowButton.innerText = 'open';
        this._openToolWindowButton.addEventListener('click', this.openTool);
        this._postNonTextButton = document.createElement('button');
        this._postNonTextButton.innerText = 'post';
        this._postNonTextButton.addEventListener('click', this.postNonText);
        this._element.appendChild(this._languageSelect);
        this._element.appendChild(this._startWatchButton);
        this._element.appendChild(this._stopWatchButton);
        this._element.appendChild(this._openToolWindowButton);
        this._element.appendChild(this._postNonTextButton);
        if (document.body) {
            document.body.appendChild(this._element);
        }
        else {
            window.onload = function (e) {
                document.body.appendChild(_this._element);
            };
        }
    }
    return TranslateToolBar;
}());

/**
 * 翻譯
 */
var TranslateGO = /** @class */ (function () {
    function TranslateGO(defaultLanguage, dev) {
        var _this = this;
        this.isWatch = false;
        // 需要被翻譯的Node
        this.translateTextNodes = new TextTranslateNodes();
        this.translatePlaceholderNodes = new PlaceholderTranslateNodes();
        // 忽略標籤
        this.ignoreTagArray = ['SCRIPT', 'LINK', 'META', 'STYLE'];
        // 忽略Attribute
        this.ignoreAttributeName = 'notTranslate';
        // Key Attribute
        this.keyAttributeName = 'translateKey';
        this.windowAlert = window.alert;
        this.windowConfirm = window.confirm;
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
        this.currentLanguage = defaultLanguage || navigator.language;
        this.db = new TranslateDB(dev);
        if (dev) {
            this.toolbar = new TranslateToolBar(this);
            this.toolbar.updateLanaguageOption(this.db.getLanguages());
            this.toolbar.changeLanaguage(this.currentLanguage);
        }
    }
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
     * 載入文字多語資料
     * @param data
     */
    TranslateGO.prototype.loadLanguageData = function (data) {
        this.db.insert(data);
        if (this.toolbar) {
            this.toolbar.updateLanaguageOption(this.db.getLanguages());
            this.toolbar.changeLanaguage(this.currentLanguage);
        }
        if (this.isWatch) {
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
        if (typeof text === 'string') {
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
            var t = getNow();
            console.log('doTranslate start');
            this.currentLanguage = language;
            this.doTranslate();
            console.log('doTranslate end', (getNow() - t) + 'ms');
            if (this.toolbar) {
                this.toolbar.changeLanaguage(this.currentLanguage);
            }
        }
    };
    /**
     * 觀察並翻譯
     */
    TranslateGO.prototype.watch = function () {
        this.stop();
        // this.translateTextNodes = new TextTranslateNodes();
        // this.translatePlaceholderNodes = new PlaceholderTranslateNodes();
        this.isWatch = true;
        console.log('find text node start');
        var t = getNow();
        this.loadTextNodes();
        console.log('find text node end', (getNow() - t) + 'ms');
        t = getNow();
        this.doTranslate();
        console.log('doTranslate end', (getNow() - t) + 'ms');
        window.alert = this.proxyAlertHanlder;
        window.confirm = this.proxyConfirmHanlder;
        document.addEventListener('DOMNodeInserted', this.domNodeInserted);
        document.addEventListener('DOMSubtreeModified', this.domSubtreeModified);
        document.addEventListener('DOMNodeInsertedIntoDocument', this.domNodeInserted);
        if (this.toolbar) {
            this.toolbar.status(true);
        }
    };
    /**
     * 停止觀察和翻譯
     */
    TranslateGO.prototype.stop = function () {
        this.isWatch = false;
        window.alert = this.windowAlert;
        window.confirm = this.windowConfirm;
        document.removeEventListener('DOMNodeInserted', this.domNodeInserted);
        document.removeEventListener('DOMSubtreeModified', this.domSubtreeModified);
        document.removeEventListener('DOMNodeInsertedIntoDocument', this.domNodeInserted);
        if (this.toolbar) {
            this.toolbar.status(false);
        }
    };
    /**
     * 是否非忽略的標籤
     * @param element
     */
    TranslateGO.prototype.isNonIgnore = function (element) {
        if (element.nodeType == 3) {
            element = element.parentElement;
        }
        if (element.nodeType == 1) {
            if (this.ignoreTagArray.indexOf(element.tagName) == -1) {
                return element.getAttribute(this.ignoreAttributeName) == null;
            }
            else {
                return false;
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
            else {
                var key = node.getAttribute(this.keyAttributeName);
                if (key) {
                    if (!node.innerText.trim()) {
                        node.innerText = key;
                    }
                }
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
        var this$1 = this;

        var parent = node;
        while ((parent = parent.parentElement) != document.documentElement) {
            if (parent.getAttribute(this$1.ignoreAttributeName) != null) {
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
        var key = node.parentElement.getAttribute(this.keyAttributeName);
        if (key) {
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
        translateNodes.setText(node, this.db.translateBySource(translateNodes.getText(node), node.translateTextSource, this.currentLanguage));
    };
    return TranslateGO;
}());
function getNow() {
    return new Date().getTime();
}

exports.TranslateGO = TranslateGO;

return exports;

}({}));
