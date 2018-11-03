declare type ColumnConvert = (value: any) => any;
declare type ValidtorConvert = (value: any) => boolean;
interface ColumnConfig {
    name?: string;
    value?: any;
    required?: boolean;
    maxValue?: number;
    minValue?: number;
    maxLength?: number;
    minLength?: number;
    validtor?: ValidtorConvert;
    convert?: ColumnConvert;
}
declare class ColumnField {
    value: any;
    message: string;
    error: string;
}
declare function Column(config?: ColumnConfig): (target: any, key: string) => void;
declare function Form(target: any): any;
declare class Test {
    a: ColumnField;
    b: any;
    c: any;
}
declare let t: Test;
