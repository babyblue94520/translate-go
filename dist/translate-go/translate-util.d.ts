export declare class TranslateUtil {
    /**
     * 取得父層
     * @param element
     */
    static getParentElement(element: any): HTMLElement;
    /**
     * 檢查HTMLElement是否渲染在body上
     * @param element
     */
    static isConnected(node: any): boolean;
    /**
     * 清除 node 過濾的方法
     * @param node
     */
    static cleanFilter(node: any): boolean;
}
