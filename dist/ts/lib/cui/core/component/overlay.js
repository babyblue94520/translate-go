import { CUI } from '../cui';
export var OverlayClassName;
(function (OverlayClassName) {
    OverlayClassName["overlay"] = "ttb-overlay";
    OverlayClassName["screen"] = "ttb-overlay-screen";
    OverlayClassName["bodyOpen"] = "ttb-overlay-open";
    OverlayClassName["open"] = "open";
})(OverlayClassName || (OverlayClassName = {}));
var overlayZIndexMax = 0;
var overlayOpenCount = 0;
/**
 * 用來擺放dialog
 */
var Overlay = /** @class */ (function () {
    function Overlay() {
        this.min = 9999;
        this.element = document.createElement('div');
        this.element.className = OverlayClassName.overlay;
        this.screenElement = document.createElement('div');
        this.screenElement.className = OverlayClassName.screen;
    }
    Overlay.prototype.getElement = function () {
        return this.element;
    };
    /**
     * 順序很重要
     * 開啟
    */
    Overlay.prototype.open = function (render) {
        overlayOpenCount++;
        this.screenElement.style.zIndex = String(++overlayZIndexMax + this.min);
        document.body.appendChild(this.screenElement);
        this.element.style.zIndex = String(++overlayZIndexMax + this.min);
        document.body.appendChild(this.element);
        if (render instanceof Function) {
            render();
        }
        document.body.classList.add(OverlayClassName.bodyOpen);
        document.documentElement.classList.add(OverlayClassName.bodyOpen);
        this.element.classList.add(OverlayClassName.open);
        this.screenElement.classList.add(OverlayClassName.open);
    };
    /**
     * 關閉
     * callback 等到關閉動畫完成後呼叫
    */
    Overlay.prototype.close = function (callback) {
        var _this = this;
        overlayOpenCount--;
        if (overlayOpenCount <= 0) {
            document.body.classList.remove(OverlayClassName.bodyOpen);
            document.documentElement.classList.remove(OverlayClassName.bodyOpen);
            overlayOpenCount = 0;
            overlayZIndexMax = 0;
        }
        this.element.classList.remove(OverlayClassName.open);
        this.screenElement.classList.remove(OverlayClassName.open);
        if (callback instanceof Function) {
            setTimeout(function () {
                callback();
                _this.element.classList.remove(OverlayClassName.open);
                _this.screenElement.classList.remove(OverlayClassName.open);
                CUI.remove(_this.element);
                CUI.remove(_this.screenElement);
            }, 337);
        }
    };
    /**
     * 移除物件
    */
    Overlay.prototype.destory = function () {
        if (this.element) {
            CUI.remove(this.element);
            CUI.remove(this.screenElement);
            this.element = undefined;
            this.screenElement = undefined;
        }
    };
    return Overlay;
}());
export { Overlay };
//# sourceMappingURL=overlay.js.map