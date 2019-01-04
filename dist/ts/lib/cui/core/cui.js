/**
 * 負責處理一些有的沒有的
 * by clare
 */
var CUI = /** @class */ (function () {
    function CUI() {
    }
    /**
     * 是否為空值
     * @param {?} value
     * @return {Boolean}
     */
    CUI.isEmpty = function (value) {
        if (value === null || value === undefined || value == '') {
            return true;
        }
        return false;
    };
    /**
     * 是否為純Array
     * @param {?} value
     * @return {Boolean}
     */
    CUI.isArray = function (value) {
        return (value instanceof Array);
    };
    /**
     * 是否為純Object
     * @param {?} value
     * @return {Boolean}
     */
    CUI.isObject = function (value) {
        if (value === null || value === undefined) {
            return false;
        }
        return (value.constructor === Object);
    };
    /**
     * 是否為空物件
     * @param {?} value
     * @return {Boolean}
     */
    CUI.isEmptyObject = function (value) {
        if (!CUI.isObject(value)) {
            return true;
        }
        if ('{}' == JSON.stringify(value)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 是否為純Function
     * @param {?} value
     * @return {Boolean}
     */
    CUI.isFunction = function (value) {
        return (value instanceof Function);
    };
    /**
     * 空值轉換為預設值
     * @param {?} value
     * @param {?} def
     * @return {?} value or default
     */
    CUI.emptyToDefault = function (value, def) {
        return CUI.isEmpty(value) ? def : value;
    };
    /**
     * 減少程式碼XD
     * @param fn 想要執行的function，不存在也會過濾掉
     * @param thisArgs
     */
    CUI.callFunction = function (fn, thisArgs) {
        var data = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            data[_i - 2] = arguments[_i];
        }
        if (CUI.isFunction(fn)) {
            return fn.apply(thisArgs, [].slice.call(arguments, 2));
        }
        return;
    };
    /**
     * 深複製
     * 1. deepClone(被複製物件) 回傳全新物件
     * 2. deepClone(目標物件，被複製物件)
     * @param data
     */
    CUI.deepClone = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var _orginData;
        var _destData;
        // 紀錄複製的物件，避免無窮遞迴
        var _logArray = [];
        if (arguments.length === 1) {
            _orginData = arguments[0];
        }
        else if (arguments.length === 2) {
            _destData = arguments[0];
            _orginData = arguments[1];
        }
        else {
            return;
        }
        if (CUI.isArray(_orginData)) {
            _destData = CUI.isArray(_destData) ? _destData : [];
        }
        else if (CUI.isObject(_orginData)) {
            _destData = CUI.isObject(_destData) ? _destData : {};
        }
        else {
            return _orginData == undefined ? _destData : _orginData;
        }
        return _copy(_destData, _orginData);
        /**
         * 複製
         */
        function _copy(dest, orgin) {
            if (_logArray.indexOf(orgin) !== -1) {
                return orgin;
            }
            _logArray.push(orgin);
            for (var i in orgin) {
                dest[i] = _getValue(orgin[i]);
            }
            return dest;
        }
        function _getValue(v) {
            if (CUI.isArray(v)) {
                return _copy([], v);
            }
            else if (CUI.isObject(v)) {
                return _copy({}, v);
            }
            else {
                return v;
            }
        }
    };
    /**
     * Object 轉換成 Combobox 陣列
     * @param data
     */
    CUI.objectToCombobox = function (data) {
        try {
            var array = [];
            for (var key in data) {
                array.push({
                    value: key,
                    name: data[key]
                });
            }
            return array;
        }
        catch (e) {
            alert(e);
        }
    };
    /**
     * Object 轉換成 Combobox 陣列
     * @param data
     */
    CUI.objectToArray = function (data) {
        try {
            var array = [];
            for (var key in data) {
                array.push(data[key]);
            }
            return array;
        }
        catch (e) {
            alert(e);
        }
    };
    /**
     * Object 轉換成 Combobox 陣列
     * @param data
     */
    CUI.comboboxToValueName = function (array, render) {
        try {
            var valueName = {};
            var data = void 0;
            for (var i in array) {
                data = array[i];
                valueName[data.value] = render ? render(data) : data.name;
            }
            return valueName;
        }
        catch (e) {
            alert(e);
        }
    };
    /**
     * 模擬form submit
     * @param config
     */
    CUI.submit = function (config) {
        config = CUI.deepClone({
            target: '_self',
            method: 'post'
        }, config);
        var formElement = CUI.create('form');
        formElement.action = config.url;
        formElement.method = config.method;
        formElement.target = config.target;
        for (var name_1 in config.params) {
            var input = CUI.create('input');
            input.type = 'hidden';
            input.name = name_1;
            input.value = config.params[name_1];
            formElement.appendChild(input);
        }
        document.body.appendChild(formElement);
        formElement.submit();
        setTimeout(function () {
            if (formElement) {
                CUI.remove(formElement);
                formElement = null;
            }
        }, 1000);
    };
    /**
     * 監聽內容變化
     * @param element
     * @param handler
     */
    CUI.addElementContentChangeEvent = function (element, handler) {
        if (element) {
            element.addEventListener('DOMSubtreeModified', handler);
        }
    };
    /**
     * 移除監聽內容變化
     * @param element
     * @param handler
     */
    CUI.removeElementContentChangeEvent = function (element, handler) {
        if (element) {
            element.removeEventListener('DOMSubtreeModified', handler);
        }
    };
    /**
     * 設定Element Translate置中
     * @param element
     */
    CUI.setTranslateCenter = function (element) {
        var height = element.offsetHeight;
        var width = element.offsetWidth;
        var translateTop = Math.round(height / 2);
        var translateLeft = Math.round(width / 2);
        CUI.style(element, 'transform', 'translate(-' + translateLeft + 'px,-' + translateTop + 'px)');
    };
    /**
     * 設定Element Translate置中
     * @param element
     */
    CUI.setCenter = function (element) {
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;
        var height = element.offsetHeight;
        var width = element.offsetWidth;
        var top = '50%';
        var left = '50%';
        var translateTop = Math.round(height / 2);
        var translateLeft = Math.round(width / 2);
        if (width > winWidth) {
            left = '10px';
            translateLeft = 0;
        }
        if (height > winHeight) {
            top = '20px';
            translateTop = 0;
        }
        element.style.top = top;
        element.style.left = left;
        CUI.style(element, 'transform', 'translate(-' + translateLeft + 'px,-' + translateTop + 'px)');
    };
    /**
     * 監聽Element中有input:focus和Enter keyup
     * @param element
     * @param handler
     */
    CUI.addListenOnEnter = function (element, handler) {
        if (element instanceof Element) {
            element.addEventListener('keyup', function (e) {
                if (e.which == 13 && (element.tagName == 'INPUT' || element.querySelector('input:focus'))) {
                    handler.call(element, e);
                }
            });
        }
    };
    /**
     * 產生HTMLElement，純粹減少編譯後的方法長度
     * @param tagName
     */
    CUI.create = function (tagName) {
        return document.createElement(tagName);
    };
    /**
     * 檢查HTMLElement是否渲染在body上
     * @param element
     */
    CUI.isConnected = function (element) {
        if (element && element.parentElement) {
            if (element.isConnected == undefined) {
                if (element == document.body || element.parentElement == document.body) {
                    return true;
                }
                else {
                    return CUI.isConnected(element.parentElement);
                }
            }
            else {
                return element.isConnected;
            }
        }
        else {
            return false;
        }
    };
    /**
     * 移除HTMLElement
     * 為了相容IE
     * @param element
     */
    CUI.remove = function (element) {
        if (element) {
            if (element.remove) {
                element.remove();
            }
            else if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
        }
    };
    /**
     * 設定瀏覽器相容的css 屬性
     * @param element
     * @param key
     * @param value
     */
    CUI.style = function (element, key, value) {
        if (element && key) {
            element.style[key] = value;
            key = key[0].toUpperCase() + key.substring(1);
            element.style['webkit' + key] = value;
            element.style['moz' + key] = value;
            element.style['ms' + key] = value;
            element.style['o' + key] = value;
        }
    };
    /**
     * 防止XSS
     * @author Clare
     * @param {String}
     * @return {String}
     */
    CUI.escaped = (function () {
        var _key = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '/': '&#x2F;',
            '"': '&quot;',
            '\'': '&#x27;'
        };
        function _escaped(m) {
            return _key[m];
        }
        return function (str) {
            return String(str).replace(/[<>&/\"\']/g, _escaped);
        };
    })();
    /**
     * 字串格式化
     * @param {String} str 字串
     * @param {Object} values 替換參數
     * @return {String} str
     */
    CUI.format = (function () {
        var regCache = {};
        function _getRegExp(key) {
            return (regCache[key] || (regCache[key] = new RegExp('\\{\\{' + key + '\\}\\}', 'gm')));
        }
        return function (str, values) {
            if (!CUI.isObject(values)) {
                return str;
            }
            for (var i in values) {
                str = str.replace(_getRegExp(i), values[i]);
            }
            return str;
        };
    })();
    /**
     * 將json 轉成 html
     * @param {String or Object} str
     * @return {String} html
     */
    CUI.printJson = (function () {
        var _space = '&emsp;&emsp;';
        var _nameHtml = '<span>"{{text}}"</span>';
        var _valueStringHtml = '<span style="color:#690">"{{text}}"</span>';
        var _valueHtml = '<span style="color:#a11">{{text}}</span>';
        var _nowSpace = '';
        return function (str) {
            _nowSpace = '';
            if (!str) {
                return str;
            }
            if (str.constructor === Object) {
                return _toHtml(str);
            }
            if (str.constructor === Array) {
                return _toHtml(str);
            }
            else if (typeof str === 'string') {
                try {
                    return _toHtml(JSON.parse(str.replace(/\n/g, '\\\\n')));
                }
                catch (e) {
                    return str;
                }
            }
            else {
                return str;
            }
        };
        function _toHtml(data) {
            if (!data) {
                return _getValue(data);
            }
            if (data.constructor === Object) {
                return _objectToHtml(data);
            }
            else if (data.constructor === Array) {
                return _arrayToHtml(data);
            }
            else {
                return _getValue(data);
            }
        }
        function _objectToHtml(obj) {
            var html = '{<br>';
            var hasData = false;
            _nowSpace += _space;
            for (var i in obj) {
                hasData = true;
                html += _nowSpace + _getName(i) + '&emsp;:&emsp;' + _toHtml(obj[i]) + ',<br>';
            }
            _nowSpace = _nowSpace.replace(_space, '');
            html += _nowSpace + '}';
            if (hasData) {
                return html;
            }
            else {
                return '{}';
            }
        }
        function _arrayToHtml(array) {
            var nowrap = array.length < 3 ? '' : '<br>';
            var html = '[' + nowrap;
            _nowSpace += _space;
            var thatSpace = (nowrap && _nowSpace);
            for (var i in array) {
                array[i] = _toHtml(array[i]);
            }
            html += thatSpace + array.join(',' + nowrap + thatSpace);
            _nowSpace = _nowSpace.replace(_space, '');
            thatSpace = (nowrap && _nowSpace);
            html += nowrap + thatSpace + ']';
            return html;
        }
        function _getName(text) {
            return CUI.format(_nameHtml, { text: CUI.escaped(text) });
        }
        function _getValue(text) {
            if (typeof text === 'string') {
                return CUI.format(_valueStringHtml, { text: CUI.escaped(text) });
            }
            else {
                return CUI.format(_valueHtml, { text: CUI.escaped(text) });
            }
        }
    })();
    /**
     * 延遲執行方法
     * @param name
     * @param delay ms
     * @param function
     */
    CUI.delayAction = (function () {
        var _timers = {};
        return function (name, delay, fn) {
            if (_timers[name]) {
                clearTimeout(_timers[name]);
            }
            var args = [].slice.call(arguments, 3);
            _timers[name] = setTimeout(function () {
                fn.apply(null, args);
                delete _timers[name];
            }, delay);
        };
    })();
    return CUI;
}());
export { CUI };
//# sourceMappingURL=cui.js.map