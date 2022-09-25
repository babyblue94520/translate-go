import { ListenerContainer } from './listener-container';
export class EventListenerContainer {
    constructor() {
        this.eventListeners = {};
    }
    addListener(event, listener, target = window) {
        let listeners = this.eventListeners[event];
        if (!listeners) {
            listeners = this.eventListeners[event] = new ListenerContainer();
        }
        listeners.addListener(listener, target);
        return listener;
    }
    addOnceListener(event, listener, target = window) {
        let listeners = this.eventListeners[event];
        if (!listeners) {
            listeners = this.eventListeners[event] = new ListenerContainer();
        }
        listeners.addOnceListener(listener, target);
        return listener;
    }
    removeListener(event, listener) {
        let listeners = this.eventListeners[event];
        if (!listeners)
            return;
        listeners.removeListener(listener);
    }
    removeAllEventListener(event) {
        delete this.eventListeners[event];
    }
    removeAllListener(target) {
        for (let event in this.eventListeners) {
            this.eventListeners[event].removeAllListener(target);
        }
    }
    dispatch(name, ...args) {
        let listeners = this.eventListeners[name];
        if (!listeners)
            return;
        return listeners.dispatch(...args);
    }
    count(name) {
        var _a;
        return ((_a = this.eventListeners[name]) === null || _a === void 0 ? void 0 : _a.count()) || 0;
    }
    clear() {
        for (let event in this.eventListeners) {
            this.eventListeners[event].clear();
        }
    }
}
