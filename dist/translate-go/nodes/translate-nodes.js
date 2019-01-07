import { TranslateType } from '../translate.interface';
import { TranslateUtil } from '../translate-util';
var TranslateNodes = /** @class */ (function () {
    function TranslateNodes(db) {
        this.db = db;
        this._nodes = [];
    }
    /**
     * 建立可翻譯Text
     * @param key
     * @param text
     */
    TranslateNodes.prototype.buildText = function (key, text) {
        var node = document.createTextNode(text);
        if (node.translateTextSource = this.db.getTranslateSourceAndLogByKey(key, text)) {
            this.doSetText(node);
            this._nodes.push(node);
            return node;
        }
    };
    /**
     * 新增可翻譯物件
     * @param node
     */
    TranslateNodes.prototype.add = function (node) {
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
    TranslateNodes.prototype.remove = function (node) {
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
    TranslateNodes.prototype.getNodes = function () {
        return this._nodes;
    };
    /**
     * 清除已經移除在畫面的物件
     */
    TranslateNodes.prototype.clean = function () {
        this._nodes = this._nodes.filter(TranslateUtil.isConnected);
    };
    /**
     * 翻譯文字依source
     * @param text
     * @param source
     * @param language
     */
    TranslateNodes.prototype.translateBySource = function (text, source, language) {
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
    TranslateNodes.prototype.doTranslate = function (lang) {
        this._lang = lang;
        for (var i = 0, l = this._nodes.length; i < l; i++) {
            this.doSetText(this._nodes[i]);
        }
    };
    /**
     * 為物件增加翻譯資料
     * @param node
     */
    TranslateNodes.prototype.addSource = function (node) {
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
    TranslateNodes.prototype.doSetText = function (node) {
        var newText = this.db.translateBySource(this.getText(node), node.translateTextSource, this._lang);
        this.setText(node, newText);
    };
    return TranslateNodes;
}());
export { TranslateNodes };
//# sourceMappingURL=translate-nodes.js.map