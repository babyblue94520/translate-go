
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
        let connected;
        if (node.isConnected == undefined) {
            let parent = TranslateUtil.getParentElement(node);
            if (!parent) {
                connected = false;
            }
            if (node == document.body || parent == document.body) {
                connected = true;
            } else {
                connected = TranslateUtil.isConnected(parent);
            }
        } else {
            connected = node.isConnected;
        }
        if (!connected) {
            node.translateTextSource = undefined;
        }
        return connected;
    }

    /**
     * 清除 node 過濾的方法
     * @param node
     */
    public static cleanFilter(node) {
        if (node.translateTextSource) {
            return TranslateUtil.isConnected(node);
        } else {
            return false;
        }
    }
}
