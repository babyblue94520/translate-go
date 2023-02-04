import TranslateGO from "../translate-go";
export default abstract class TranslateNode<T extends HTMLElement = any> {
    private readonly translateGo;
    protected readonly node: T;
    protected readonly group: string;
    protected readonly index: number;
    protected readonly key: any;
    private readonly source;
    private readonly originValue;
    constructor(translateGo: TranslateGO, node: T, group: string, key?: string, index?: number);
    getKey(): string;
    getNode(): T;
    match(): boolean;
    translate(): string;
    private getTranslateText;
    alive(): boolean;
    destroy(): void;
    protected abstract initKey(): string;
    protected abstract setValue(text: string): any;
    protected abstract getValue(): string;
}
