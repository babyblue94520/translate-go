import { TranslateKeySource } from './translate.interface';
import { TranslateNodes } from './nodes/translate-nodes';
/**
 * 取得TranslateGO
 */
export declare function getTranslateGO(): TranslateGO;
/**
 * 翻譯
 */
export declare class TranslateGO {
    private watch;
    private db;
    private currentLanguage;
    private translateTextNodes;
    private translatePlaceholderNodes;
    private windowAlert;
    private windowConfirm;
    private elementSetAttributeOrigin;
    constructor();
    /**
     * 是否監控中
     */
    isWatch(): boolean;
    getTranslateNode(): TranslateNodes;
    /**
     * 取得無法翻譯的文字
     */
    getNonTranslateText(): any;
    /**
     * 重新載入文字多語資料
     */
    reload(data?: TranslateKeySource): void;
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
    start(): void;
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
    private buildProxySetAttribute(go);
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
     * 紀錄需要翻譯的node
     * @param node
     */
    private addNode(translateNodes, node);
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    private modifyAddNode(translateNodes, node);
    /**
     * 檢查是否需要翻譯
     * @param node
     */
    private isCanAddNode(node);
    /**
     * 更新翻譯
     * @param translateNodes
     * @param node
     */
    private updateNode(translateNodes, node);
    /**
     * 為node新增翻譯檔
     * @param node
     */
    private addTranslateSource(translateNodes, node);
    /**
     * 翻譯
     */
    private doTranslateNodesSetText(translateNodes, node);
}
