import { TranslateNodes } from './nodes/translate-nodes';
/**
 * 翻譯
 */
export declare class TranslateGO {
    private isWatch;
    private db;
    private currentLanguage;
    private translateTextNodes;
    private translatePlaceholderNodes;
    private ignoreTagArray;
    private ignoreAttributeName;
    private translatekey;
    private placeholderTranslatekey;
    private placeholder;
    private windowAlert;
    private windowConfirm;
    private elementSetAttributeOrigin;
    private toolbar;
    constructor(defaultLanguage: string, dev?: boolean);
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
    /**
     * 攔截alert訊息並翻譯
     */
    private proxyAlertHanlder;
    /**
     * 攔截confirm訊息並翻譯
     */
    private proxyConfirmHanlder;
    /**
     * 攔截setAttribute
     * @param go
     */
    private buildProxySetAttribute;
    /**
     * dom新增node時，找出可翻譯node
     * @param 事件
     */
    private domNodeInserted;
    /**
     * dom 有異動的時候檢查node文字是否更新
     * @param 事件
     */
    private domSubtreeModified;
    /**
     * 是否非忽略的標籤
     * @param element
     */
    private isNonIgnore;
    /**
     * Node 處理
     * @param node
     * @param handler
     */
    private nodeHandler;
    /**
     * NodeList 處理
     * @param nodes 不重複寫loop
     * @param handler
     */
    private loopNodes;
    /**
     * 載入需要翻譯的Node
     */
    private loadTextNodes;
    /**
     * 執行翻譯
     */
    private doTranslate;
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    private addNode;
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    private modifyAddNode;
    /**
     * 檢查是否需要翻譯
     * @param node
     */
    private isCanAddNode;
    /**
     * 更新翻譯
     * @param translateNodes
     * @param node
     */
    private updateNode;
    /**
     * 為node新增翻譯檔
     * @param node
     */
    private addTranslateSource;
    /**
     * 翻譯
     */
    private doTranslateNodesSetText;
}
