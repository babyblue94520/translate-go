import TranslateNode from "./translate-node";
export default class TranslateNodePlaceholder extends TranslateNode<HTMLInputElement> {
    protected initKey(): string;
    protected setValue(text: string): void;
    protected getValue(): string;
}
