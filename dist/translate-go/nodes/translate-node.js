export default class TranslateNode {
    constructor(translateGo, node, group, key = '', index = -1) {
        this.translateGo = translateGo;
        this.node = node;
        this.group = group;
        this.index = index;
        this.source = {};
        this.key = key ? key : this.initKey().trim();
        this.originValue = this.getValue();
    }
    getKey() {
        return this.key;
    }
    getNode() {
        var _a;
        return ((_a = this.node.childNodes) === null || _a === void 0 ? void 0 : _a.item(this.index)) || this.node;
    }
    match() {
        return this.key != this.getTranslateText();
    }
    translate() {
        let text = this.getTranslateText();
        if (text) {
            if (this.getValue() != text) {
                this.setValue(text);
            }
        }
        else {
            this.setValue(this.originValue);
        }
        return text;
    }
    getTranslateText() {
        if (this.key.length == 0) {
            return this.key;
        }
        let args = {};
        for (let name of this.node.getAttributeNames()) {
            args[name] = this.node.getAttribute(name);
        }
        let language = this.translateGo.getLanguage();
        let text = this.translateGo.get(this.key, args, language, this.group);
        if (text) {
            this.source[language] = text;
        }
        return text;
    }
    alive() {
        if (this.node.isConnected) {
            return true;
        }
        return false;
    }
    destroy() {
        this.setValue(this.originValue);
    }
}
