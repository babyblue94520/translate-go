import { PlaceholderTranslateNodes } from './nodes/translate-placeholder-nodes';
import { TextTranslateNodes } from './nodes/translate-text-nodes';
import { TranslateConfig, TranslateConst } from './config/translate-config';
import { TranslateDB } from './translate-db';
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
        // 翻譯 text
        this.translateTextNodes.clean();
        var nodes = this.translateTextNodes.getNodes();
        for (var i = 0, l = nodes.length; i < l; i++) {
            this.doTranslateNodesSetText(this.translateTextNodes, nodes[i]);
        }
        // 翻譯placeholder
        this.translatePlaceholderNodes.clean();
        nodes = this.translatePlaceholderNodes.getNodes();
        for (var i = 0, l = nodes.length; i < l; i++) {
            this.doTranslateNodesSetText(this.translatePlaceholderNodes, nodes[i]);
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
export { TranslateGO };
//# sourceMappingURL=translate-go.js.map