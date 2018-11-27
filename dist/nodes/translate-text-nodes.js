import * as tslib_1 from "tslib";
import { TranslateNodes } from './translate-nodes';
var TextTranslateNodes = /** @class */ (function (_super) {
    tslib_1.__extends(TextTranslateNodes, _super);
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
        if (text) {
            node.data = text;
        }
    };
    return TextTranslateNodes;
}(TranslateNodes));
export { TextTranslateNodes };
//# sourceMappingURL=translate-text-nodes.js.map