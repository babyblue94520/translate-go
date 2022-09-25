
/**
 * 非同步執行
 * @param ms
 */
export function Async(ms: number = 0) {
  return function (target, name: string, descriptor: PropertyDescriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, name);
    }
    let method = descriptor.value;
    descriptor.value = function (...args) {
      return setTimeout(() => {
        method.apply(this, args);
      }, ms);
    };
    return descriptor;
  };
}

export function toAsyncFn<T extends Function>(fn: T, ms: number = 0): T {
  return <any>function (...args) {
    return setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

