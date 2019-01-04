/**
 * 檢測變化
 * @param name ChangeDetectorRef 名稱
 */
export function DetectChange(name) {
    return function (target, key, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var result = originalMethod.apply(this, arguments);
            if (this[name] && this[name].detectChanges instanceof Function) {
                this[name].detectChanges();
            }
            else {
                console.error(name + ' is\'t ChangeDetectorRef');
            }
            return result;
        };
        return descriptor;
    };
}
//# sourceMappingURL=detect-change.js.map