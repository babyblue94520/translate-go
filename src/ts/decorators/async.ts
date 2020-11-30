/**
 * Async
 * 非同步執行 async execute function
 * @param delay 延後時間(ms)
 */
export function Async(delay: number = 0) {
    return build.bind(null, delay);
}

function build(delay, target, name, descriptor) {
    if (descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, name);
    }
    let method = descriptor.value;
    // tslint:disable-next-line:space-before-function-paren
    descriptor.value = function (...args): number {
        return setTimeout(runner.bind(this, method, ...args), delay);
    };
    return descriptor;
}

function runner(method: any, ...args) {
    method.apply(this, args);
}
