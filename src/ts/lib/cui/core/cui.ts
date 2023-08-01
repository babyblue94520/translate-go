
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

}
