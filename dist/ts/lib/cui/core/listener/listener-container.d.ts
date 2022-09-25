export declare class ListenerContainer<Listener extends Function = Function> {
    private readonly listenerMap;
    private listeners;
    addListener(listener: Listener, target?: Object): Listener;
    addOnceListener(listener: Listener, target?: Object): Listener;
    removeListener(listener: Listener): void;
    removeAllListener(target: Object): void;
    dispatch(...args: any[]): Promise<any[]>;
    dispatchIgnoreTarget(target: any, ...args: any[]): Promise<any[]>;
    count(): number;
    clear(): void;
    private mark;
    private clearMark;
}
