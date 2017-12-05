"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var translate_nodes_1 = require("./translate-nodes");
var TextTranslateNodes = (function (_super) {
    __extends(TextTranslateNodes, _super);
    function TextTranslateNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextTranslateNodes.prototype.need = function (node) {
        return node.nodeType == 3;
    };
    TextTranslateNodes.prototype.getText = function (node) {
        return node.data;
    };
    TextTranslateNodes.prototype.setText = function (node, text) {
        node.data = text;
    };
    return TextTranslateNodes;
}(translate_nodes_1.TranslateNodes));
exports.TextTranslateNodes = TextTranslateNodes;
//# sourceMappingURL=translate-text-nodes.js.map