import * as tslib_1 from "tslib";
import { TranslateNodes } from './translate-nodes';
import { TranslateConst } from '../config/translate-config';
var TranslateSubmits = /** @class */ (function (_super) {
    tslib_1.__extends(TranslateSubmits, _super);
    function TranslateSubmits() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslateSubmits.prototype.need = function (node) {
        return node.type && node.type.toLowerCase() == 'submit' && (node.value != undefined || node.getAttribute(TranslateConst.Translatekey) != undefined);
    };
    TranslateSubmits.prototype.getText = function (node) {
        return node.value;
    };
    TranslateSubmits.prototype.setText = function (node, text) {
        if (text) {
            node.value = text;
        }
    };
    TranslateSubmits.prototype.findKeyText = function (node) {
        return {
            key: node.getAttribute(TranslateConst.Translatekey),
            text: node.value
        };
    };
    return TranslateSubmits;
}(TranslateNodes));
export { TranslateSubmits };
//# sourceMappingURL=translate-submits.js.map