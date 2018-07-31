var TranslateNodes = /** @class */ (function () {
    function TranslateNodes() {
        this._nodes = [];
    }
    /**
     *
     * @param node
     */
    TranslateNodes.prototype.indexOf = function (node) {
        return this._nodes.indexOf(node);
    };
    /**
     *
     */
    TranslateNodes.prototype.getNodes = function () {
        return this._nodes;
    };
    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    TranslateNodes.prototype.add = function (node) {
        this._nodes.push(node);
    };
    /**
     * 移除需要翻譯的node
     * @param node
     */
    TranslateNodes.prototype.remove = function (node) {
        var index = this.indexOf(node);
        // tslint:disable-next-line:curly
        if (index == -1)
            return false;
        this._nodes.splice(index, 1);
        return true;
    };
    TranslateNodes.prototype.clean = function () {
        this._nodes = this._nodes.filter(this.cleanFilterHandler);
    };
    TranslateNodes.prototype.cleanFilterHandler = function (node) {
        // tslint:disable-next-line:curly
        return node && node.isConnected;
    };
    return TranslateNodes;
}());
export { TranslateNodes };
//# sourceMappingURL=translate-nodes.js.map