export interface Combobox {
  value: any;
  name: string;
}

export interface ValueName<R = any> {
  [key: string]: R;
}

export type ValueNameRender = (v) => any;

export interface ComboboxData<T extends Combobox, R = any> {
  array: T[];
  map: ValueName<R>;
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
