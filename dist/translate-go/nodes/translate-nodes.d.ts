import { KeyText, TranslateNode, TranslateSource } from '../translate.interface';
import { TranslateDB } from '../translate-db';
export declare abstract class TranslateNodes {
    private db;
    protected _nodes: any[];
    protected _lang: string;
    abstract need(node: any): boolean;
    abstract getText(node: any): string;
    abstract setText(node: any, text: string): any;
    abstract findKeyText(node: any): KeyText;
    constructor(db: TranslateDB);
    /**
     * 建立可翻譯Text
     * @param key
     * @param text
     */
    buildText(key: string, text?: string): TranslateNode;
    /**
     * 新增可翻譯物件
     * @param node
     */
    add(node: TranslateNode): void;
    /**
     * 移除需要翻譯的node
     * @param node
     */
    remove(node: TranslateNode): boolean;
    /**
     * 回傳所有可以翻譯的物件
     */
    getNodes(): Array<TranslateNode>;
    /**
     * 清除已經移除在畫面的物件
     */
    clean(): void;
    /**
     * 翻譯文字依source
     * @param text
     * @param source
     * @param language
     */
    translateBySource(text: string, source: TranslateSource, language: string): string;
    /**
     * 根據語系翻譯
     * @param lang
     */
    doTranslate(lang: string): void;
    /**
     * 為物件增加翻譯資料
     * @param node
     */
    private addSource;
    /**
     * 更新翻譯物件的文字
     * @param node
     */
    private doSetText;
}
