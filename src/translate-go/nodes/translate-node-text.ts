import TranslateNode from './translate-node';

export default class TranslateNodeText extends TranslateNode<HTMLElement> {

  protected initKey() {
    return (<Text>this.node.childNodes?.item(this.index))?.data || '';
  }

  protected setValue(data: string) {
    if (this.index == -1) {
      this.node.innerText = data;
    } else {
      let text = (<Text>this.node.childNodes.item(this.index));
      if (text) {
        if (text.nodeType == 3) {
          text.data = data;
        } else {
          this.node.replaceChild(new Text(data), text);
        }
      } else {
        this.node.insertBefore(new Text(data), this.node.childNodes.item(this.index - 1));
      }
    }
  }

  protected getValue(): string {
    return (<Text>this.node.childNodes?.item(this.index))?.data || '';
  }
}
