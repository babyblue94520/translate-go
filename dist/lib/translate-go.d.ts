import { TranslateNodes } from './nodes/translate-nodes';
/**
 * 翻譯
 */
export declare class TranslateGO {
    private _db;
    private _currentLanguage;
    private _cacheInputElement;
    private _translateTextNodes;
    private _translatePlaceholderNodes;
    private _ignoreTagArray;
    private _temp;
    private windowAlert;
    private windowConfirm;
    private toolbar;
    private _count;
    constructor(defaultLanguage: string, dev?: boolean);
    /**
     * 延遲執行方法
     * @param name
     * @param delay ms
     * @param function
     */
    delayAction: (name: string, delay: number, fn: Function) => void;
    getTranslateNode(): TranslateNodes;
    /**
     * 取得無法翻譯的文字
     */
    getNonTranslateText(): any;
    /**
     * 載入文字多語資料
     * @param data
     */
    loadLanguageData(data: any): void;
    /**
     * 取得當前語系
     */
    getLanguage(): string;
    /**
     * 取得當前語系文字
     * @param text
     */
    getText(text: string): string;
    /**
     * 取得當前語系文字
     * @param key
     */
    getTextByKey(key: string): string;
    /**
     * 依輸入語系進行翻譯
     * @param language
     */
    translate(language: string): void;
    /**
     * 觀察並翻譯
     */
    watch(): void;
    /**
     * 停止觀察和翻譯
     */
    stop(): void;
    private addListener;
    private proxyAlertHanlder;
    private proxyConfirmHanlder;
    /**
     * 全部文字翻譯
     * @param 事件
     */
    private delayDOMNodeInserted;
    private delayLoadTextNodes;
    /**
     * 是否非忽略的標籤
     * @param element
     */
    private isNonIgnore(element);
    /**
     * Node 處理
     * @param node
     * @param handler
     */
    private nodeHandler(node);
    /**
     * NodeList 處理
     * @param nodes 不重複寫loop
     * @param handler
     */
    private loopNodes(nodes);
    /**
     * 載入需要翻譯的Node
     */
    private loadTextNodes();
    /**
     * 執行翻譯
     */
    private doTranslate();
    /**
     *
     * @param translateNodes
     */
    private doTranslateNodesSetText(translateNodes, node);
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    private addNode(translateNodes, node);
    /**
     *
     * @param node
     */
    private addTranslateSource(translateNodes, node);
}
