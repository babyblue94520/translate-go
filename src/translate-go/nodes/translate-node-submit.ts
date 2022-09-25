import TranslateNode from './translate-node';

export default class TranslateNodeSubmit extends TranslateNode<HTMLInputElement> {
  protected initKey(): string {
    return this.node.value;
  }

  protected setValue(text: string) {
    this.node.value = text;
  }
  protected getValue(): string {
    return this.node.value;
  }
}
