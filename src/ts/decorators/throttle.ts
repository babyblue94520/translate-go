/**
 * Throttle
 * 相同任務，限定時間內只能執行一次
 * @param interval 間隔時間(ms)
 */
export function Throttle(interval: number) {
    return build.bind(null, interval);
}

function build(interval, target, name, descriptor) {
    if (descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, name);
    }
    let method = descriptor.value;
    let key = '__throttle_' + name;
    descriptor.value = function(...args) {
        let next = this[key] || 0;
        if (next <= Date.now()) {
            method.apply(this, args);
            this[key] = Date.now() + interval;
        }
    };
    return descriptor;
}
