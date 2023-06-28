import TranslateNode from './translate-node';
export default class TranslateNodeText extends TranslateNode<HTMLElement> {
    protected initKey(): string;
    protected setValue(data: string): void;
    protected getValue(): string;
}
