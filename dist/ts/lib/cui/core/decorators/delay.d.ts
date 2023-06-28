/**
 * 延遲執行
 * @param ms 延迟时间
 * @param interval 最大間隔，超过一定执行
 */
export declare function Delay(ms?: number, interval?: number): (target: any, name: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function toDelayFn<T extends Function>(fn: T, ms?: number, interval?: number): T;
