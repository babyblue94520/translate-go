
/**
 * 非同步執行
 * @param delay
 */
export function Async(delay: number = 0) {
    return function (target, key, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        let originalMethod = descriptor.value;
        descriptor.value = function () {
            let _this = this;
            let _originalArgs = arguments;
            return setTimeout(function () {
                originalMethod.apply(_this, _originalArgs);
                _this = undefined;
                _originalArgs = undefined;
            }, delay);
        };
        return descriptor;
    };
}

/**
 * 延遲執行
 * @param delay
 */
export function Delay(delay: number = 0) {
    return function (target, key, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        let originalMethod = descriptor.value;
        descriptor.value = function () {
            let _this = this;
            let _originalArgs = arguments;
            if (_this['__DelayTimer_' + key]) {
                clearTimeout(_this['__DelayTimer_' + key]);
                delete _this['__DelayTimer_' + key];
            }
            _this['__DelayTimer_' + key] = setTimeout(function () {
                originalMethod.apply(_this, _originalArgs);
                delete _this['__DelayTimer_' + key];
                _this = undefined;
                _originalArgs = undefined;
            }, delay);
        };
        return descriptor;
    };
}
