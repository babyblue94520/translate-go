interface ListenerData<Listener> {
  target: Object,
  listener: Listener;
  once: boolean;
}

export class ListenerContainer<Listener extends Function = Function>{
  private readonly listenerMap = new Map<Listener, ListenerData<Listener>>();
  private listeners: ListenerData<Listener>[] = [];

  public addListener(listener: Listener, target: Object = window): Listener {
    if (this.listenerMap.get(listener)) {
      return;
    }
    let data: ListenerData<Listener> = {
      target: target,
      listener: listener,
      once: false,
    };
    this.listeners.push(data);
    this.listenerMap.set(listener, data);
    return listener;
  }

  public addOnceListener(listener: Listener, target: Object = window): Listener {
    if (this.listenerMap.get(listener)) {
      return;
    }
    let data: ListenerData<Listener> = {
      target: target,
      listener: listener,
      once: true,
    };
    this.listeners.push(data);
    this.listenerMap.set(listener, data);
    return listener;
  }

  public removeListener(listener: Listener): void {
    this.listeners.forEach((data, i) => {
      if (data?.listener == listener) this.mark(data.listener, i);
    });
    this.clearMark();
  }

  public removeAllListener(target: Object): void {
    this.listeners.forEach((data, i) => {
      if (data?.target == target) this.mark(data.listener, i);
    });
    this.clearMark();
  }

  public dispatch(...args): Promise<any[]> {
    return this.dispatchIgnoreTarget(null, ...args);
  }

  public dispatchIgnoreTarget(target: any, ...args): Promise<any[]> {
    if (this.listeners.length == 0) return;
    let results = [];
    this.listeners.forEach((data, i) => {
      try {
        if (target == data?.target) return;
        results.push(data.listener.apply(data.target, args));
      } catch (e) {
        this.mark(data.listener, i);
        console.error(e);
      }
      if (data.once) this.mark(data.listener, i);
    });
    this.clearMark();
    return Promise.all(results);
  }

  public count() {
    return this.listeners.length;
  }

  public clear() {
    this.listeners.length = 0;
    this.listenerMap.clear();
  }

  private mark(listener: Listener, index: number) {
    this.listeners[index] = undefined;
    this.listenerMap.delete(listener);
  }

  private clearMark() {
    this.listeners = this.listeners.filter(data => data);
  }
}
