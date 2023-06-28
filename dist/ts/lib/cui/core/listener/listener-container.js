export class ListenerContainer {
    constructor() {
        this.listenerMap = new Map();
        this.listeners = [];
    }
    addListener(listener, target = window) {
        if (this.listenerMap.get(listener)) {
            return;
        }
        let data = {
            target: target,
            listener: listener,
            once: false,
        };
        this.listeners.push(data);
        this.listenerMap.set(listener, data);
        return listener;
    }
    addOnceListener(listener, target = window) {
        if (this.listenerMap.get(listener)) {
            return;
        }
        let data = {
            target: target,
            listener: listener,
            once: true,
        };
        this.listeners.push(data);
        this.listenerMap.set(listener, data);
        return listener;
    }
    removeListener(listener) {
        this.listeners.forEach((data, i) => {
            if ((data === null || data === void 0 ? void 0 : data.listener) == listener)
                this.mark(data.listener, i);
        });
        this.clearMark();
    }
    removeAllListener(target) {
        this.listeners.forEach((data, i) => {
            if ((data === null || data === void 0 ? void 0 : data.target) == target)
                this.mark(data.listener, i);
        });
        this.clearMark();
    }
    dispatch(...args) {
        return this.dispatchIgnoreTarget(null, ...args);
    }
    dispatchIgnoreTarget(target, ...args) {
        if (this.listeners.length == 0)
            return;
        let results = [];
        this.listeners.forEach((data, i) => {
            try {
                if (target == (data === null || data === void 0 ? void 0 : data.target))
                    return;
                results.push(data.listener.apply(data.target, args));
            }
            catch (e) {
                this.mark(data.listener, i);
                console.error(e);
            }
            if (data.once)
                this.mark(data.listener, i);
        });
        this.clearMark();
        return Promise.all(results);
    }
    count() {
        return this.listeners.length;
    }
    clear() {
        this.listeners.length = 0;
        this.listenerMap.clear();
    }
    mark(listener, index) {
        this.listeners[index] = undefined;
        this.listenerMap.delete(listener);
    }
    clearMark() {
        this.listeners = this.listeners.filter(data => data);
    }
}
