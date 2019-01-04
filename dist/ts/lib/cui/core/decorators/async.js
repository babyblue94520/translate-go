/**
 * 非同步執行
 * @param delay
 */
export function Async(delay) {
    if (delay === void 0) { delay = 0; }
    return function (target, key, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var _this = this;
            var _originalArgs = arguments;
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
export function Delay(delay) {
    if (delay === void 0) { delay = 0; }
    return function (target, key, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var _this = this;
            var _originalArgs = arguments;
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
//# sourceMappingURL=async.js.map