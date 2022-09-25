import TranslateNode from "./translate-node";

export default class TranslateNodePlaceholder extends TranslateNode<HTMLInputElement> {
  protected initKey(): string {
    return this.node.placeholder;
  }
  protected setValue(text: string) {
    this.node.placeholder = text;
  }
  protected getValue(): string {
    return this.node.placeholder;
  }
}
