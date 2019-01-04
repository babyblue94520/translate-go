import * as tslib_1 from "tslib";
import { TranslateNodes } from './translate-nodes';
import { TranslateUtil } from '../translate-util';
import { TranslateConst } from '../config/translate-config';
var TranslateTexts = /** @class */ (function (_super) {
    tslib_1.__extends(TranslateTexts, _super);
    function TranslateTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslateTexts.prototype.need = function (node) {
        return node.nodeType == 3;
    };
    TranslateTexts.prototype.getText = function (node) {
        return node.data;
    };
    TranslateTexts.prototype.setText = function (node, text) {
        if (text) {
            node.data = text;
        }
    };
    TranslateTexts.prototype.findKeyText = function (node) {
        return {
            key: TranslateUtil.getParentElement(node).getAttribute(TranslateConst.Translatekey),
            text: node.data
        };
    };
    return TranslateTexts;
}(TranslateNodes));
export { TranslateTexts };
//# sourceMappingURL=translate-texts.js.map