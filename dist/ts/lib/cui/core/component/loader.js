/**
 * Loader物件
 * by clare
 */
var Loader = /** @class */ (function () {
    function Loader() {
        var _this = this;
        this.openCount = 0;
        this.defauleZIndex = '999';
        /**
         * 回傳物件
         */
        this.getElement = function () {
            return _this.element;
        };
        this.message = function (msg) {
            if (msg) {
                _this.textElement.innerHTML = msg;
            }
            else {
                _this.textElement.innerHTML = Loader.defText;
            }
        };
        /**
         * 延遲開啟繞圈圈動畫，如果等待時間太短就不用出現
         * @param {string} msg 顯示訊息
         * @param {any} zIndex css z-index
         */
        this.open = function (msg, zIndex) {
            _this.openCount++;
            clearTimeout(_this.openTimer);
            _this.openTimer = setTimeout(_this.doOpen.bind(_this, msg, zIndex), 300);
        };
        this.openNotDelay = function (msg, zIndex) {
            _this.openCount++;
            _this.doOpen(msg, zIndex);
        };
        /**
         * 開啟繞圈圈動畫
         * @param {string} msg 顯示訊息
         * @param {any} zIndex css z-index
         */
        this.doOpen = function (msg, zIndex) {
            if (_this.openCount > 0) {
                if (zIndex) {
                    _this.element.style.zIndex = zIndex;
                }
                else {
                    _this.element.style.zIndex = _this.defauleZIndex;
                }
                if (msg) {
                    _this.textElement.innerHTML = msg;
                }
                else {
                    _this.textElement.innerHTML = Loader.defText;
                }
                _this.element.classList.add('show');
                _this.addParentClass();
            }
        };
        /**
         * 關閉繞圈圈
         */
        this.close = function () {
            if (--_this.openCount > 0) {
                return;
            }
            clearTimeout(_this.openTimer);
            _this.openCount = 0;
            _this.element.style.zIndex = '';
            _this.element.classList.remove('show');
            _this.removeParentClass();
        };
        /**
         * 絕對關閉繞圈圈
         */
        this.closeAll = function () {
            _this.openCount = 0;
            _this.element.style.zIndex = '';
            _this.element.classList.remove('show');
            _this.removeParentClass();
        };
        /**
         * 產生繞圈圈物件
         */
        this.create = function () {
            var element = document.createElement('div');
            element.className = 'cui-loader';
            element.innerHTML = Loader.loadHtml;
            return element;
        };
        this.element = this.create();
        this.textElement = this.element.querySelector('.text');
    }
    Loader.prototype.addParentClass = function () {
        if (this.element && this.element.parentElement) {
            this.element.parentElement.classList.add('cui-loader-hidden');
        }
    };
    Loader.prototype.removeParentClass = function () {
        if (this.element && this.element.parentElement) {
            this.element.parentElement.classList.remove('cui-loader-hidden');
        }
    };
    Loader.defText = '處理中';
    Loader.loadHtml = [
        ' <div class="cui-loader-block">',
        '   <div class="cui-loading"></div>',
        '   <div class="text"></div>',
        ' </div>'
    ].join('');
    return Loader;
}());
export { Loader };
//# sourceMappingURL=loader.js.map