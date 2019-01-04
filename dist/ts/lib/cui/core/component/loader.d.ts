/**
 * Loader物件
 * by clare
 */
export declare class Loader {
    private static readonly defText;
    private static readonly loadHtml;
    private element;
    private textElement;
    private openCount;
    private defauleZIndex;
    private openTimer;
    constructor();
    /**
     * 回傳物件
     */
    getElement: () => HTMLElement;
    message: (msg?: string) => void;
    /**
     * 延遲開啟繞圈圈動畫，如果等待時間太短就不用出現
     * @param {string} msg 顯示訊息
     * @param {any} zIndex css z-index
     */
    open: (msg?: string, zIndex?: any) => void;
    openNotDelay: (msg?: string, zIndex?: any) => void;
    /**
     * 開啟繞圈圈動畫
     * @param {string} msg 顯示訊息
     * @param {any} zIndex css z-index
     */
    private doOpen;
    /**
     * 關閉繞圈圈
     */
    close: () => void;
    /**
     * 絕對關閉繞圈圈
     */
    closeAll: () => void;
    /**
     * 產生繞圈圈物件
     */
    private create;
    private addParentClass;
    private removeParentClass;
}
