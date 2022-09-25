interface PromiseScope {
  aborted: boolean;
  reject?: (reason?: any) => void;
}


export class PromiseAbort<T> extends Promise<T> {

  private constructor(
    executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void
    , private scope: PromiseScope
  ) {
    super(executor);
  }

  public abort() {
    if (this.scope) {
      this.scope.aborted = true;
      PromiseAbort.doAbort(this.scope.reject);
      this.scope = undefined;
    }
  }

  public static create<T>(
    executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void
  ): PromiseAbort<T> {
    let scope: PromiseScope = {
      aborted: false
    };
    let promise = new PromiseAbort<T>((resolve, reject) => {
      if (scope.aborted) {
        PromiseAbort.doAbort(reject);
      } else {
        scope.reject = reject;
        executor(resolve, reject);
      }
    }, scope);
    return promise;
  }

  private static doAbort(reject: (reason?: any) => void) {
    if (reject instanceof Function) {
      reject('abort');
    }
  }
}
