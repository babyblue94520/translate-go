export interface Combobox {
    value: any;
    name: string;
}
export interface ValueName {
    [key: string]: any;
}
export declare type ValueNameRender = (v: any) => any;
export interface ComboboxData<T extends Combobox> {
    array: T[];
    map: ValueName;
}
export interface ComboboxCallback<T extends ComboboxData<Combobox>> {
    (data: T): any;
}
export interface SubmitConfig {
    url: string;
    target?: string;
    method?: string;
    params: ValueName;
}
