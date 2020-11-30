/**
 * Debounce
 * 避免短時間連續重複執行相同任務
 * @param interval 間隔時間(ms)
 */
export function Debounce(interval: number) {
    return build.bind(null, interval);
}

function build(interval: number, target, name: string, descriptor: PropertyDescriptor) {
    if (descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, name);
    }
    let method = descriptor.value;
    let key = '__debounce_' + name;
    // tslint:disable-next-line:space-before-function-paren
    descriptor.value = function (...args) {
        if (this[key]) {
            clearTimeout(this[key]);
        }
        return this[key] = setTimeout(runner.bind(this, method, ...args), interval);

    };
    return descriptor;
}

function runner(method: any, ...args) {
    method.apply(this, args);
}
