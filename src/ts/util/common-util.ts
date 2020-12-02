export abstract class CommonUtil {

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
     * 是否為純Array
     * @param {?} value
     * @return {Boolean}
     */
    public static isArray(value) {
        return (value instanceof Array);
    }

    /**
     * 是否為空值
     * @param {?} value
     * @return {Boolean}
     */
    public static isEmpty(value) {
        if (value == null || value == '') {
            return true;
        }
        return false;
    }

    /**
     * 是否為空物件
     * @param {?} value
     * @return {Boolean}
     */
    public static isEmptyObject(value) {
        if (!CommonUtil.isObject(value)) {
            return true;
        }
        if ('{}' == JSON.stringify(value)) {
            return true;
        } else {
            return false;
        }
    }
}