interface Scope {
  callFn: CallFn
  , ms: number
  , interval: number
  , time?: number
}

interface CallFn {
  (ms: number, args: any[]): any;
}

/**
 * 延遲執行
 * @param ms 延迟时间
 * @param interval 最大間隔，超过一定执行
 */
export function Delay(ms: number = 0, interval: number = 0) {
  return function (target, name: string, descriptor: PropertyDescriptor) {
    if (!descriptor) {
      descriptor = Object.getOwnPropertyDescriptor(target, name);
    }
    let timerName = `__delay_${name}`;
    let method = descriptor.value;
    let scope: Scope = {
      ms: ms
      , interval: interval
      , callFn: function (ms, args) {
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

export function toDelayFn<T extends Function>(fn: T, ms: number = 0, interval: number = 0): T {
  let timer;
  let scope: Scope = {
    ms: ms
    , interval: interval
    , callFn: function (ms, args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, ms);
      return timer;
    }
  };
  return <any>function (...args) {
    return runner.call(this, scope, args);
  };
}

function runner(scope: Scope, args): any {
  let ms = scope.ms;
  if (scope.interval > 0) {
    let now = Date.now();
    if (!scope.time) { scope.time = now + scope.interval; }
    if (scope.time <= now) {
      scope.time = 0;
      ms = 0;
    }
  }
  return scope.callFn.call(this, ms, args);
}

