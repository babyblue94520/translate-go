import { TranslateDB } from './translate-db';
import { TextTranslateNodes } from './nodes/translate-text-nodes';
import { PlaceholderTranslateNodes } from './nodes/translate-placeholder-nodes';
import { TranslateToolBar } from './translate-toolbar';
/**
 * 翻譯
 */
var TranslateGO = (function () {
    function TranslateGO(defaultLanguage, dev) {
        var _this = this;
        // 需要被翻譯的Node
        this._cacheInputElement = [];
        // 需要被翻譯的Node
        // private _translateNodesArray = [new TextTranslateNodes(), new InputTranslateNodes(), new TextAreaTranslateNodes()];
        // 需要被翻譯的Node
        this._translateTextNodes = new TextTranslateNodes();
        this._translatePlaceholderNodes = new PlaceholderTranslateNodes();
        // 忽略標籤
        this._ignoreTagArray = ['SCRIPT', 'LINK', 'META', 'STYLE', 'NO-TRANSLATE'];
        this._temp = [];
        this.windowAlert = window.alert;
        this.windowConfirm = window.confirm;
        /**
         * 延遲執行方法
         * @param name
         * @param delay ms
         * @param function
         */
        this.delayAction = (function () {
            var _timers = {};
            var _startTime = {};
            return function (name, delay, fn) {
                if (_timers[name]) {
                    clearTimeout(_timers[name]);
                }
                else {
                    _startTime[name] = performance.now();
                }
                _timers[name] = setTimeout(function () {
                    console.log(name, 'delay time:', performance.now() - _startTime[name]);
                    _startTime[name] = performance.now();
                    fn();
                    console.log(name, 'run time:', performance.now() - _startTime[name]);
                    delete _timers[name];
                    delete _startTime[name];
                }, delay);
            };
        })();
        this.addListener = function () {
            window.alert = _this.proxyAlertHanlder;
            window.confirm = _this.proxyConfirmHanlder;
            document.addEventListener('DOMNodeInserted', _this.delayDOMNodeInserted);
            document.addEventListener('DOMSubtreeModified', _this.delayDOMSubtreeModified);
            document.addEventListener('DOMNodeInsertedIntoDocument', _this.delayDOMNodeInserted);
        };
        this.proxyAlertHanlder = function (text) {
            _this.windowAlert.call(window, _this.getText(text));
        };
        this.proxyConfirmHanlder = function (text) {
            return _this.windowConfirm.call(window, _this.getText(text));
        };
        /**
         * 全部文字翻譯
         * @param 事件
         */
        this.delayDOMNodeInserted = function (e) {
            _this.nodeHandler(e.target);
        };
        /**
         * 全部文字翻譯
         * @param 事件
         */
        this.delayDOMSubtreeModified = function (e) {
            if (_this._translateTextNodes.need(e.target)) {
                _this.addNode.call(_this, _this._translateTextNodes, e.target);
            }
        };
        this._currentLanguage = defaultLanguage || navigator.language;
        this._db = new TranslateDB(dev);
        if (dev) {
            this.toolbar = new TranslateToolBar(this);
            this.toolbar.updateLanaguageOption(this._db.getLanguages());
            this.toolbar.changeLanaguage(this._currentLanguage);
        }
    }
    TranslateGO.prototype.getTranslateNode = function () {
        return this._translateTextNodes;
    };
    /**
     * 取得無法翻譯的文字
     */
    TranslateGO.prototype.getNonTranslateText = function () {
        return this._db.getNonTranslate();
    };
    /**
     * 載入文字多語資料
     * @param data
     */
    TranslateGO.prototype.loadLanguageData = function (data) {
        this._db.insert(data);
        if (this.toolbar) {
            this.toolbar.updateLanaguageOption(this._db.getLanguages());
            this.toolbar.changeLanaguage(this._currentLanguage);
        }
        this.loadTextNodes();
    };
    /**
     * 取得當前語系
     */
    TranslateGO.prototype.getLanguage = function () {
        return this._currentLanguage;
    };
    /**
     * 取得當前語系文字
     * @param text
     */
    TranslateGO.prototype.getText = function (text) {
        if (typeof text === 'string') {
            return this._db.translate(text, this._currentLanguage);
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
        return this._db.translateByKey(key, this._currentLanguage);
    };
    /**
     * 依輸入語系進行翻譯
     * @param language
     */
    TranslateGO.prototype.translate = function (language) {
        if (this._currentLanguage == language) {
            return;
        }
        if (this._db.hasLanguage(language)) {
            var t = performance.now();
            console.log('_doTranslate start');
            this._currentLanguage = language;
            this.doTranslate();
            console.log('_doTranslate end', (performance.now() - t));
            if (this.toolbar) {
                this.toolbar.changeLanaguage(this._currentLanguage);
            }
        }
    };
    /**
     * 觀察並翻譯
     */
    TranslateGO.prototype.watch = function () {
        this.stop();
        console.log('find text node start');
        var t = performance.now();
        this.loadTextNodes();
        console.log('find text node end', (performance.now() - t));
        this.doTranslate();
        this.addListener();
        if (this.toolbar) {
            this.toolbar.status(true);
        }
    };
    /**
     * 停止觀察和翻譯
     */
    TranslateGO.prototype.stop = function () {
        window.alert = this.windowAlert;
        window.confirm = this.windowConfirm;
        document.removeEventListener('DOMNodeInserted', this.delayDOMNodeInserted);
        document.removeEventListener('DOMSubtreeModified', this.delayDOMSubtreeModified);
        document.removeEventListener('DOMNodeInsertedIntoDocument', this.delayDOMNodeInserted);
        if (this.toolbar) {
            this.toolbar.status(false);
        }
    };
    /**
     * 是否非忽略的標籤
     * @param element
     */
    TranslateGO.prototype.isNonIgnore = function (element) {
        return this._ignoreTagArray.indexOf(element.tagName) == -1;
    };
    /**
     * Node 處理
     * @param node
     * @param handler
     */
    TranslateGO.prototype.nodeHandler = function (node) {
        if (node && this.isNonIgnore(node) && node.isConnected) {
            if (this._translateTextNodes.need(node)) {
                this.addNode.call(this, this._translateTextNodes, node);
                return;
            }
            else if (this._translatePlaceholderNodes.need(node)) {
                this.addNode.call(this, this._translatePlaceholderNodes, node);
                return;
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
        // console.log('nodes', nodes);
        for (var i = 0, l = nodes.length; i < l; i++) {
            // console.log(i, nodes[i]);
            this.nodeHandler(nodes[i]);
        }
    };
    /**
     * 載入需要翻譯的Node
     */
    TranslateGO.prototype.loadTextNodes = function () {
        this.loopNodes(document.querySelectorAll('*'));
    };
    /**
     * 執行翻譯
     */
    TranslateGO.prototype.doTranslate = function () {
        this._translateTextNodes.clean();
        var nodes = this._translateTextNodes.getNodes();
        for (var i = 0, l = nodes.length; i < l; i++) {
            this.doTranslateNodesSetText(this._translateTextNodes, nodes[i]);
        }
    };
    /**
     *
     * @param translateNodes
     */
    TranslateGO.prototype.doTranslateNodesSetText = function (translateNodes, node) {
        translateNodes.setText(node, this._db.translateBySource(translateNodes.getText(node), node.translateTextSource, this._currentLanguage));
    };
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    TranslateGO.prototype.addNode = function (translateNodes, node) {
        if (node.translateTextSource) {
            var text = translateNodes.getText(node);
            if (node.translateTextSource.currentText != translateNodes.getText(node)) {
                this.addTranslateSource(translateNodes, node);
                this.doTranslateNodesSetText(translateNodes, node);
            }
        }
        else {
            if (this.addTranslateSource(translateNodes, node)) {
                translateNodes.add(node);
                this.doTranslateNodesSetText(translateNodes, node);
            }
        }
    };
    /**
     *
     * @param node
     */
    TranslateGO.prototype.addTranslateSource = function (translateNodes, node) {
        var text = translateNodes.getText(node);
        if (text == undefined || String(text).length == 0) {
            return false;
        }
        return (node.translateTextSource = this._db.getTranslateSource(text));
    };
    return TranslateGO;
}());
export { TranslateGO };
//# sourceMappingURL=translate-go.js.map