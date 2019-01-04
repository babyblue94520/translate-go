import { Combobox, ValueNameRender, ValueName, SubmitConfig } from './common';
/**
 * 負責處理一些有的沒有的
 * by clare
 */
export declare class CUI {
    /**
     * 防止XSS
     * @author Clare
     * @param {String}
     * @return {String}
     */
    static escaped: (str: string) => string;
    /**
     * 字串格式化
     * @param {String} str 字串
     * @param {Object} values 替換參數
     * @return {String} str
     */
    static format: (str: string, values: Object) => string;
    /**
     * 將json 轉成 html
     * @param {String or Object} str
     * @return {String} html
     */
    static printJson: (str: any) => string;
    /**
     * 延遲執行方法
     * @param name
     * @param delay ms
     * @param function
     */
    static delayAction: (name: string, delay: number, fn: Function) => void;
    /**
     * 是否為空值
     * @param {?} value
     * @return {Boolean}
     */
    static isEmpty(value: any): boolean;
    /**
     * 是否為純Array
     * @param {?} value
     * @return {Boolean}
     */
    static isArray(value: any): boolean;
    /**
     * 是否為純Object
     * @param {?} value
     * @return {Boolean}
     */
    static isObject(value: any): boolean;
    /**
     * 是否為空物件
     * @param {?} value
     * @return {Boolean}
     */
    static isEmptyObject(value: any): boolean;
    /**
     * 是否為純Function
     * @param {?} value
     * @return {Boolean}
     */
    static isFunction(value: any): boolean;
    /**
     * 空值轉換為預設值
     * @param {?} value
     * @param {?} def
     * @return {?} value or default
     */
    static emptyToDefault(value: any, def: any): any;
    /**
     * 減少程式碼XD
     * @param fn 想要執行的function，不存在也會過濾掉
     * @param thisArgs
     */
    static callFunction(fn: Function, thisArgs?: any, ...data: any[]): any;
    /**
     * 深複製
     * 1. deepClone(被複製物件) 回傳全新物件
     * 2. deepClone(目標物件，被複製物件)
     * @param data
     */
    static deepClone(...data: any[]): any;
    /**
     * Object 轉換成 Combobox 陣列
     * @param data
     */
    static objectToCombobox(data: any): Combobox[];
    /**
     * Object 轉換成 Combobox 陣列
     * @param data
     */
    static objectToArray(data: any): any[];
    /**
     * Object 轉換成 Combobox 陣列
     * @param data
     */
    static comboboxToValueName(array: Combobox[], render?: ValueNameRender): ValueName;
    /**
     * 模擬form submit
     * @param config
     */
    static submit(config: SubmitConfig): void;
    /**
     * 監聽內容變化
     * @param element
     * @param handler
     */
    static addElementContentChangeEvent(element: HTMLElement, handler: any): void;
    /**
     * 移除監聽內容變化
     * @param element
     * @param handler
     */
    static removeElementContentChangeEvent(element: HTMLElement, handler: any): void;
    /**
     * 設定Element Translate置中
     * @param element
     */
    static setTranslateCenter(element: HTMLElement): void;
    /**
     * 設定Element Translate置中
     * @param element
     */
    static setCenter(element: HTMLElement): void;
    /**
     * 監聽Element中有input:focus和Enter keyup
     * @param element
     * @param handler
     */
    static addListenOnEnter(element: HTMLElement, handler: Function): void;
    /**
     * 產生HTMLElement，純粹減少編譯後的方法長度
     * @param tagName
     */
    static create<T extends HTMLElement>(tagName: string): T;
    /**
     * 檢查HTMLElement是否渲染在body上
     * @param element
     */
    static isConnected(element: HTMLElement): boolean;
    /**
     * 移除HTMLElement
     * 為了相容IE
     * @param element
     */
    static remove(element: HTMLElement): void;
    /**
     * 設定瀏覽器相容的css 屬性
     * @param element
     * @param key
     * @param value
     */
    static style(element: HTMLElement, key: string, value: string): void;
}
