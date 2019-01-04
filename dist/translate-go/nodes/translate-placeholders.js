import * as tslib_1 from "tslib";
import { TranslateNodes } from './translate-nodes';
import { TranslateConst } from '../config/translate-config';
var TranslatePlaceholders = /** @class */ (function (_super) {
    tslib_1.__extends(TranslatePlaceholders, _super);
    function TranslatePlaceholders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslatePlaceholders.prototype.need = function (node) {
        return (node.placeholder != undefined && node.placeholder != '') || node.getAttribute(TranslateConst.PlaceholderTranslatekey) != undefined;
    };
    TranslatePlaceholders.prototype.getText = function (node) {
        return node.placeholder;
    };
    TranslatePlaceholders.prototype.setText = function (node, text) {
        if (text) {
            node.placeholder = text;
        }
    };
    TranslatePlaceholders.prototype.findKeyText = function (node) {
        var key = node.getAttribute(TranslateConst.PlaceholderTranslatekey);
        var text;
        if (key != undefined) {
            text = node.getAttribute(TranslateConst.Placeholder);
            if (text == undefined || text == '') {
                text = key;
                node.setAttribute(TranslateConst.Placeholder, key);
            }
        }
        return {
            key: key,
            text: text
        };
    };
    return TranslatePlaceholders;
}(TranslateNodes));
export { TranslatePlaceholders };
//# sourceMappingURL=translate-placeholders.js.map