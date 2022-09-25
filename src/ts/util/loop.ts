export interface LoopCall<T> {
  (loop: Loop<T>): void;
}

export interface LoopBefore<T> {
  (array: T[]): void;
}

export interface LoopAfter<T> {
  (array: T[]): void;
}

export interface LoopHandler<T> {
  (record: T, index: number, array: T[]): void | boolean;
}


export default class Loop<T>{
  private readonly befores = [];
  private readonly afters = [];
  private readonly handlers = [];

  public static of<T>(array: T[]): Loop<T> {
    return new Loop<T>(array);
  }

  constructor(private readonly array: T[]) {

  }

  public call(fn: LoopCall<T>) {
    if (fn instanceof Function) {
      fn(this);
    }
    return this;
  }

  public before(handler: LoopBefore<T>): Loop<T> {
    if (handler instanceof Function) {
      this.befores.push(handler);
    }
    return this;
  }

  public after(handler: LoopBefore<T>): Loop<T> {
    if (handler instanceof Function) {
      this.afters.push(handler);
    }
    return this;
  }

  public handler(handler: LoopHandler<T>): Loop<T> {
    if (handler instanceof Function) {
      this.handlers.push(handler);
    }
    return this;
  }

  public run(): void {
    let array = this.array;
    this.befores.forEach(handler => {
      handler(array);
    });
    if (array) {
      array.forEach((v, i, a) => {
        this.handlers.forEach((handler, j) => {
          if (handler && handler(v, i, a) == true) this.handlers[j] = undefined;
        });
      });
    }
    this.afters.forEach(handler => {
      handler(array);
    });
  }
}
