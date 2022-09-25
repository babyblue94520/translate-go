
export function TookTime(target, name: string, descriptor: PropertyDescriptor) {
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, name);
  }
  let method = descriptor.value;
  descriptor.value = function (...args) {
    let t = Date.now();
    try {
      return method.apply(this, args);
    } finally {
      console.log(`%c${this.constructor.name}.${name} took time ${Date.now() - t}ms`, 'color: #2196F3;font-weight: bold;', Date.now());
    }
  };
  return descriptor;
}

export function toTookTimeFn<T extends Function>(fn: T, ms: number = 0): T {
  return <any>function (...args) {
    let t = Date.now();
    try {
      return fn.apply(this, args);
    } finally {
      console.log(`%c${this.constructor.name}.${name} took time ${Date.now() - t}ms`, 'color: #2196F3;font-weight: bold;', Date.now());
    }
  };
}
