import TranslateNode from './translate-node';
export default class TranslateNodeSubmit extends TranslateNode {
    initKey() {
        return this.node.value;
    }
    setValue(text) {
        this.node.value = text;
    }
    getValue() {
        return this.node.value;
    }
}
