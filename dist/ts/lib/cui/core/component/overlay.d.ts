export declare enum OverlayClassName {
    overlay = "ttb-overlay",
    screen = "ttb-overlay-screen",
    bodyOpen = "ttb-overlay-open",
    open = "open"
}
/**
 * 用來擺放dialog
 */
export declare class Overlay {
    private element;
    private screenElement;
    private min;
    constructor();
    getElement(): HTMLElement;
    /**
     * 順序很重要
     * 開啟
    */
    open(render: Function): void;
    /**
     * 關閉
     * callback 等到關閉動畫完成後呼叫
    */
    close(callback?: Function): void;
    /**
     * 移除物件
    */
    destory(): void;
}
