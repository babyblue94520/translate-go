import TranslateNode from "./translate-node";
export default class TranslateNodePlaceholder extends TranslateNode {
    initKey() {
        return this.node.placeholder;
    }
    setValue(text) {
        this.node.placeholder = text;
    }
    getValue() {
        return this.node.placeholder;
    }
}
