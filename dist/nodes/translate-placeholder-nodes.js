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
import { TranslateNodes } from './translate-nodes';
var PlaceholderTranslateNodes = /** @class */ (function (_super) {
    __extends(PlaceholderTranslateNodes, _super);
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