import * as tslib_1 from "tslib";
import { TranslateNodes } from './translate-nodes';
var PlaceholderTranslateNodes = /** @class */ (function (_super) {
    tslib_1.__extends(PlaceholderTranslateNodes, _super);
    function PlaceholderTranslateNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaceholderTranslateNodes.prototype.need = function (node) {
        return node.placeholder != undefined || node.placeholder != '';
    };
    PlaceholderTranslateNodes.prototype.getText = function (node) {
        return node.placeholder;
    };
    PlaceholderTranslateNodes.prototype.setText = function (node, text) {
        if (text) {
            node.placeholder = text;
        }
    };
    return PlaceholderTranslateNodes;
}(TranslateNodes));
export { PlaceholderTranslateNodes };
//# sourceMappingURL=translate-placeholder-nodes.js.map