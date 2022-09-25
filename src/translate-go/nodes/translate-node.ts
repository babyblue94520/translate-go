import TranslateGO from "../translate-go";


export default abstract class TranslateNode<T extends HTMLElement = any> {
  protected readonly key;
  private readonly source = {};
  private readonly originValue;

  constructor(
    private readonly translateGo: TranslateGO,
    protected readonly node: T,
    protected readonly group: string,
    key: string = '',
    protected readonly index: number = -1
  ) {
    this.key = key ? key : this.initKey().trim();
    this.originValue = this.getValue();
  }

  public getKey(): string {
    return this.key;
  }

  public getNode(): T {
    return <T>this.node.childNodes?.item(this.index) || this.node;
  }

  public match(): boolean {
    return this.key != this.getTranslateText();
  }

  public translate(): string {
    let text = this.getTranslateText();
    if (text) {
      if (this.getValue() != text) {
        this.setValue(text);
      }
    } else {
      this.setValue(this.originValue);
    }
    return text;
  }

  private getTranslateText(): string {
    if (this.key.length == 0) { return this.key; }
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

  public alive(): boolean {
    if (this.node.isConnected) {
      return true;
    }
    return false;
  }

  public destroy() {
    this.setValue(this.originValue);
  }

  protected abstract initKey(): string;
  protected abstract setValue(text: string);
  protected abstract getValue(): string;
}
