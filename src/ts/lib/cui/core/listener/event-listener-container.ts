import { ListenerContainer } from './listener-container';

export class EventListenerContainer<Event extends string | number = string, Listener extends Function = Function>{
  private readonly eventListeners: { [key: string | number]: ListenerContainer<Listener> } = {};

  public addListener(event: Event, listener: Listener, target: Object = window): Listener {
    let listeners = this.eventListeners[event];
    if (!listeners) {
      listeners = this.eventListeners[event] = new ListenerContainer();
    }
    listeners.addListener(listener, target);
    return listener;
  }

  public addOnceListener(event: Event, listener: Listener, target: Object = window): Listener {
    let listeners = this.eventListeners[event];
    if (!listeners) {
      listeners = this.eventListeners[event] = new ListenerContainer();
    }
    listeners.addOnceListener(listener, target);
    return listener;
  }

  public removeListener(event: Event, listener: Listener): Listener {
    let listeners = this.eventListeners[event];
    if (!listeners) return;
    listeners.removeListener(listener);
  }

  public removeAllEventListener(event: Event) {
    delete this.eventListeners[event];
  }

  public removeAllListener(target: Object) {
    for (let event in this.eventListeners) {
      this.eventListeners[event].removeAllListener(target);
    }
  }

  public dispatch(name: Event, ...args): Promise<any[]> {
    let listeners = this.eventListeners[name];
    if (!listeners) return;
    return listeners.dispatch(...args);
  }

  public count(name: Event) {
    return this.eventListeners[name]?.count() || 0;
  }

  public clear() {
    for (let event in this.eventListeners) {
      this.eventListeners[event].clear();
    }
  }
}
