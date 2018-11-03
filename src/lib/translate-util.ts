export class TranslateUtil {

    /**
     * 取得父層
     * @param element
     */
    public static getParentElement(element): HTMLElement {
        if (element.parentElement != undefined) {
            return element.parentElement;
        }
        if (element.parentNode != undefined) {
            return element.parentNode as HTMLElement;
        }
        return undefined;
    }

    /**
     * 檢查HTMLElement是否渲染在body上
     * @param element
     */
    public static isConnected(node): boolean {
        if (!node) {
            return false;
        }
        if (node.isConnected == undefined) {
            let parent = TranslateUtil.getParentElement(node);
            if (!parent) {
                return false;
            }
            if (node == document.body || parent == document.body) {
                return true;
            } else {
                return TranslateUtil.isConnected(parent);
            }
        } else {
            return node.isConnected;
        }
    }
}
