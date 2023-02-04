import TranslateNode from './translate-node';
export default class TranslateNodeText extends TranslateNode {
    initKey() {
        var _a, _b;
        return ((_b = (_a = this.node.childNodes) === null || _a === void 0 ? void 0 : _a.item(this.index)) === null || _b === void 0 ? void 0 : _b.data) || '';
    }
    setValue(data) {
        if (this.index == -1) {
            this.node.innerText = data;
        }
        else {
            let text = this.node.childNodes.item(this.index);
            if (text) {
                if (text.nodeType == 3) {
                    text.data = data;
                }
                else {
                    this.node.replaceChild(new Text(data), text);
                }
            }
            else {
                this.node.insertBefore(new Text(data), this.node.childNodes.item(this.index - 1));
            }
        }
    }
    getValue() {
        var _a, _b;
        return ((_b = (_a = this.node.childNodes) === null || _a === void 0 ? void 0 : _a.item(this.index)) === null || _b === void 0 ? void 0 : _b.data) || '';
    }
}
