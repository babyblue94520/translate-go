var TranslateUtil = /** @class */ (function () {
    function TranslateUtil() {
    }
    /**
     * 取得父層
     * @param element
     */
    TranslateUtil.getParentElement = function (element) {
        if (element.parentElement != undefined) {
            return element.parentElement;
        }
        if (element.parentNode != undefined) {
            return element.parentNode;
        }
        return undefined;
    };
    /**
     * 檢查HTMLElement是否渲染在body上
     * @param element
     */
    TranslateUtil.isConnected = function (node) {
        if (!node) {
            return false;
        }
        var connected;
        if (node.isConnected == undefined) {
            var parent_1 = TranslateUtil.getParentElement(node);
            if (!parent_1) {
                connected = false;
            }
            if (node == document.body || parent_1 == document.body) {
                connected = true;
            }
            else {
                connected = TranslateUtil.isConnected(parent_1);
            }
        }
        else {
            connected = node.isConnected;
        }
        if (!connected) {
            node.translateTextSource = undefined;
        }
        return connected;
    };
    return TranslateUtil;
}());
export { TranslateUtil };
//# sourceMappingURL=translate-util.js.map