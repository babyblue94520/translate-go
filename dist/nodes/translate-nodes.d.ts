import { ITranslateNode } from '../translate.interface';
export declare abstract class TranslateNodes {
    protected _nodes: any[];
    abstract need(node: any): boolean;
    abstract getText(node: any): string;
    abstract setText(node: any, text: string): any;
    /**
     *
     * @param node
     */
    indexOf(node: any): number;
    /**
     *
     */
    getNodes(): Array<ITranslateNode>;
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    add(node: any): void;
    /**
     * 移除需要翻譯的node
     * @param node
     */
    remove(node: any): boolean;
    clean(): void;
    private cleanFilterHandler;
}
