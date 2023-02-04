/**
 * 延遲執行
 * @param ms 延迟时间
 * @param interval 最大間隔，超过一定执行
 */
export function Delay(ms = 0, interval = 0) {
    return function (target, name, descriptor) {
        if (!descriptor) {
            descriptor = Object.getOwnPropertyDescriptor(target, name);
        }
        let timerName = `__delay_${name}`;
        let method = descriptor.value;
        let scope = {
            ms: ms,
            interval: interval,
            callFn: function (ms, args) {
                clearTimeout(this[timerName]);
                let timer = this[timerName] = setTimeout(() => {
                    method.apply(this, args);
                }, ms);
                return timer;
            }
        };
        descriptor.value = function (...args) {
            return runner.call(this, scope, args);
        };
        return descriptor;
    };
}
export function toDelayFn(fn, ms = 0, interval = 0) {
    let timer;
    let scope = {
        ms: ms,
        interval: interval,
        callFn: function (ms, args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, ms);
            return timer;
        }
    };
    return function (...args) {
        return runner.call(this, scope, args);
    };
}
function runner(scope, args) {
    let ms = scope.ms;
    if (scope.interval > 0) {
        let now = Date.now();
        if (!scope.time) {
            scope.time = now + scope.interval;
        }
        if (scope.time <= now) {
            scope.time = 0;
            ms = 0;
        }
    }
    return scope.callFn.call(this, ms, args);
}
