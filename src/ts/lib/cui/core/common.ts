
export interface Combobox {
    value: any;
    name: string;
}

export interface ValueName {
    [key: string]: any;
}

export type ValueNameRender = (v) => any;

export interface ComboboxData<T extends Combobox> {
    array: T[];
    map: ValueName;
}

export interface ComboboxCallback<T extends ComboboxData<Combobox>> {
    (data: T);
}

export interface SubmitConfig {
    url: string;
    target?: string;
    method?: string;
    params: ValueName;
}
