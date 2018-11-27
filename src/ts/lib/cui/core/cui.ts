import { Combobox, ValueNameRender, ValueName, SubmitConfig } from './common';

/**
 * 負責處理一些有的沒有的
 * by clare
 */
export class CUI {

    /**
     * 防止XSS
     * @author Clare
     * @param {String}
     * @return {String}
     */
    public static escaped = (() => {
        const _key = {
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
        return (str: string): string => {
            return String(str).replace(/[<>&/\"\']/g, _escaped);
        };
    })();

    /**
     * 字串格式化
     * @param {String} str 字串
     * @param {Object} values 替換參數
     * @return {String} str
     */
    public static format = (() => {
        let regCache = {};
        function _getRegExp(key) {
            return (regCache[key] || (regCache[key] = new RegExp('\\{\\{' + key + '\\}\\}', 'gm')));
        }
        return (str: string, values: Object): string => {
            if (!CUI.isObject(values)) {
                return str;
            }
            for (let i in values) {
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
    public static printJson = (function () {
        const _space = '&emsp;&emsp;';
        const _nameHtml = '<span>"{{text}}"</span>';
        const _valueStringHtml = '<span style="color:#690">"{{text}}"</span>';
        const _valueHtml = '<span style="color:#a11">{{text}}</span>';
        let _nowSpace = '';

        return function (str: any): string {
            _nowSpace = '';
            if (!str) {
                return str;
            }
            if (str.constructor === Object) {
                return _toHtml(str);
            } if (str.constructor === Array) {
                return _toHtml(str);
            } else if (typeof str === 'string') {
                try {
                    return _toHtml(JSON.parse(str.replace(/\n/g, '\\\\n')));
                } catch (e) {
                    return str;
                }
            } else {
                return str;
            }
        };

        function _toHtml(data): string {
            if (!data) {
                return _getValue(data);
            }
            if (data.constructor === Object) {
                return _objectToHtml(data);
            } else if (data.constructor === Array) {
                return _arrayToHtml(data);
            } else {
                return _getValue(data);
            }
        }

        function _objectToHtml(obj): string {
            let html = '{<br>';
            let hasData = false;
            _nowSpace += _space;

            for (let i in obj) {
                hasData = true;
                html += _nowSpace + _getName(i) + '&emsp;:&emsp;' + _toHtml(obj[i]) + ',<br>';
            }
            _nowSpace = _nowSpace.replace(_space, '');
            html += _nowSpace + '}';
            if (hasData) {
                return html;
            } else {
                return '{}';
            }
        }

        function _arrayToHtml(array): string {
            let nowrap = array.length < 3 ? '' : '<br>';
            let html = '[' + nowrap;
            _nowSpace += _space;
            let thatSpace = (nowrap && _nowSpace);
            for (let i in array) {
                array[i] = _toHtml(array[i]);
            }
            html += thatSpace + array.join(',' + nowrap + thatSpace);
            _nowSpace = _nowSpace.replace(_space, '');
            thatSpace = (nowrap && _nowSpace);
            html += nowrap + thatSpace + ']';
            return html;
        }

        function _getName(text): string {
            return CUI.format(_nameHtml, { text: CUI.escaped(text) });
        }

        function _getValue(text): string {
            if (typeof text === 'string') {
                return CUI.format(_valueStringHtml, { text: CUI.escaped(text) });
            } else {
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
    public static delayAction = (() => {
        let _timers = {};

        return function (name: string, delay: number, fn: Function) {
            if (_timers[name]) {
                clearTimeout(_timers[name]);
            }
            let args = [].slice.call(arguments, 3);
            _timers[name] = setTimeout(function () {
                fn.apply(null, args);
                delete _timers[name];
            }, delay);
        };
    })();

    /**
     * 是否為空值
     * @param {?} value
     * @return {Boolean}
     */
    public static isEmpty(value) {
        if (value === null || value === undefined || value == '') {
            return true;
        }
        return false;
    }

    /**
     * 是否為純Array
     * @param {?} value
     * @return {Boolean}
     */
    public static isArray(value) {
        return (value instanceof Array);
    }

    /**
     * 是否為純Object
     * @param {?} value
     * @return {Boolean}
     */
    public static isObject(value) {
        if (value === null || value === undefined) {
            return false;
        }
        return (value.constructor === Object);
    }

    /**
     * 是否為空物件
     * @param {?} value
     * @return {Boolean}
     */
    public static isEmptyObject(value) {
        if (!CUI.isObject(value)) {
            return true;
        }
        if ('{}' == JSON.stringify(value)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 是否為純Function
     * @param {?} value
     * @return {Boolean}
     */
    public static isFunction(value) {
        return (value instanceof Function);
    }

    /**
     * 空值轉換為預設值
     * @param {?} value
     * @param {?} def
     * @return {?} value or default
     */
    public static emptyToDefault(value, def) {
        return CUI.isEmpty(value) ? def : value;
    }
    /**
     * 減少程式碼XD
     * @param fn 想要執行的function，不存在也會過濾掉
     * @param thisArgs
     */
    public static callFunction(fn: Function, thisArgs?, ...data) {
        if (CUI.isFunction(fn)) {
            return fn.apply(thisArgs, [].slice.call(arguments, 2));
        }
        return;
    }

    /**
     * 深複製
     * 1. deepClone(被複製物件) 回傳全新物件
     * 2. deepClone(目標物件，被複製物件)
     * @param data
     */
    public static deepClone(...data) {
        let _orginData;
        let _destData;
        // 紀錄複製的物件，避免無窮遞迴
        let _logArray = [];

        if (arguments.length === 1) {
            _orginData = arguments[0];
        } else if (arguments.length === 2) {
            _destData = arguments[0];
            _orginData = arguments[1];
        } else {
            return;
        }
        if (CUI.isArray(_orginData)) {
            _destData = CUI.isArray(_destData) ? _destData : [];
        } else if (CUI.isObject(_orginData)) {
            _destData = CUI.isObject(_destData) ? _destData : {};
        } else {
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
            for (let i in orgin) {
                dest[i] = _getValue(orgin[i]);
            }
            return dest;
        }

        function _getValue(v) {
            if (CUI.isArray(v)) {
                return _copy([], v);
            } else if (CUI.isObject(v)) {
                return _copy({}, v);
            } else {
                return v;
            }
        }
    }


    /**
     * Object 轉換成 Combobox 陣列
     * @param data
     */
    public static objectToCombobox(data: any): Combobox[] {
        try {
            let array = [];
            for (let key in data) {
                array.push({
                    value: key,
                    name: data[key]
                });
            }
            return array;
        } catch (e) {
            alert(e);
        }
    }

    /**
     * Object 轉換成 Combobox 陣列
     * @param data
     */
    public static objectToArray(data: any): any[] {
        try {
            let array = [];
            for (let key in data) {
                array.push(data[key]);
            }
            return array;
        } catch (e) {
            alert(e);
        }
    }

    /**
     * Object 轉換成 Combobox 陣列
     * @param data
     */
    public static comboboxToValueName(array: Combobox[], render?: ValueNameRender): ValueName {
        try {
            let valueName: ValueName = {};
            let data: Combobox;
            for (let i in array) {
                data = array[i];
                valueName[data.value] = render ? render(data) : data.name;
            }
            return valueName;
        } catch (e) {
            alert(e);
        }
    }

    /**
     * 模擬form submit
     * @param config
     */
    public static submit(config: SubmitConfig) {
        config = CUI.deepClone({
            target: '_self',
            method: 'post'
        }, config);
        let formElement = CUI.create<HTMLFormElement>('form');
        formElement.action = config.url;
        formElement.method = config.method;
        formElement.target = config.target;
        for (let name in config.params) {
            let input = CUI.create<HTMLInputElement>('input');
            input.type = 'hidden';
            input.name = name;
            input.value = config.params[name];
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
    }

    /**
     * 監聽內容變化
     * @param element
     * @param handler
     */
    public static addElementContentChangeEvent(element: HTMLElement, handler) {
        if (element) {
            element.addEventListener('DOMSubtreeModified', handler);
        }
    }

    /**
     * 移除監聽內容變化
     * @param element
     * @param handler
     */
    public static removeElementContentChangeEvent(element: HTMLElement, handler) {
        if (element) {
            element.removeEventListener('DOMSubtreeModified', handler);
        }
    }

    /**
     * 設定Element Translate置中
     * @param element
     */
    public static setTranslateCenter(element: HTMLElement) {
        let height = element.offsetHeight;
        let width = element.offsetWidth;
        let translateTop = Math.round(height / 2);
        let translateLeft = Math.round(width / 2);
        CUI.style(element, 'transform', 'translate(-' + translateLeft + 'px,-' + translateTop + 'px)');
    }

    /**
     * 設定Element Translate置中
     * @param element
     */
    public static setCenter(element: HTMLElement) {
        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
        let height = element.offsetHeight;
        let width = element.offsetWidth;
        let top = '50%';
        let left = '50%';
        let translateTop = Math.round(height / 2);
        let translateLeft = Math.round(width / 2);
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
    }

    /**
     * 監聽Element中有input:focus和Enter keyup
     * @param element
     * @param handler
     */
    public static addListenOnEnter(element: HTMLElement, handler: Function) {
        if (element instanceof Element) {
            element.addEventListener('keyup', (e) => {
                if (e.which == 13 && (element.tagName == 'INPUT' || element.querySelector('input:focus'))) {
                    handler.call(element, e);
                }
            });
        }
    }

    /**
     * 產生HTMLElement，純粹減少編譯後的方法長度
     * @param tagName
     */
    public static create<T extends HTMLElement>(tagName: string): T {
        return (<T>document.createElement(tagName));
    }

    /**
     * 檢查HTMLElement是否渲染在body上
     * @param element
     */
    public static isConnected(element: HTMLElement): boolean {
        if (element && element.parentElement) {
            if ((<any>element).isConnected == undefined) {
                if (element == document.body || element.parentElement == document.body) {
                    return true;
                } else {
                    return CUI.isConnected(element.parentElement);
                }
            } else {
                return (<any>element).isConnected;
            }
        } else {
            return false;
        }
    }

    /**
     * 移除HTMLElement
     * 為了相容IE
     * @param element
     */
    public static remove(element: HTMLElement) {
        if (element) {
            if (element.remove) {
                element.remove();
            } else if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
        }
    }

    /**
     * 設定瀏覽器相容的css 屬性
     * @param element
     * @param key
     * @param value
     */
    public static style(element: HTMLElement, key: string, value: string) {
        if (element && key) {
            element.style[key] = value;
            key = key[0].toUpperCase() + key.substring(1);
            element.style['webkit' + key] = value;
            element.style['moz' + key] = value;
            element.style['ms' + key] = value;
            element.style['o' + key] = value;
        }
    }
}
