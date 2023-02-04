export declare class EventListenerContainer<Event extends string | number = string, Listener extends Function = Function> {
    private readonly eventListeners;
    addListener(event: Event, listener: Listener, target?: Object): Listener;
    addOnceListener(event: Event, listener: Listener, target?: Object): Listener;
    removeListener(event: Event, listener: Listener): Listener;
    removeAllEventListener(event: Event): void;
    removeAllListener(target: Object): void;
    dispatch(name: Event, ...args: any[]): Promise<any[]>;
    count(name: Event): number;
    clear(): void;
}
