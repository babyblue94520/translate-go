import { TranslateSource } from './translate.interface';
/**
 * 翻譯資料庫
 */
export declare class TranslateDB {
    private _special;
    private _startRegexStr;
    private _endRegexStr;
    private _modifier;
    private _cleanRegex;
    private _cleanStartRegex;
    private _cleanEndRegex;
    private _jumpRegex;
    private _wordSource;
    private _keySource;
    private _wordRegexs;
    private _textLangs;
    private _langs;
    private _cacheNonTranslateText;
    constructor();
    getLanguages(): Array<string>;
    /**
     * 是否有該語系翻譯資料
     * @param language
     */
    hasLanguage(language: string): boolean;
    /**
     * 載入文字多語資料
     * @param data
     */
    insert(data: any): void;
    /**
     * 取得無法翻譯的文字
     */
    getNonTranslate(): any;
    /**
     * 翻譯文字
     * @param text
     * @param language
     */
    translate(text: string, language: string): string;
    /**
     * 翻譯文字依Key
     * @param key
     * @param language
     */
    translateByKey(key: string, language: any): string;
    /**
     * 翻譯文字依source
     * @param text
     * @param source
     * @param language
     */
    translateBySource(text: string, source: TranslateSource, language: string): string;
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    getTranslateSource(text: string): TranslateSource;
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    getTranslateSourceByKey(key: string): TranslateSource;
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * 額外記錄沒有key
     * @param text
     */
    getTranslateSourceAndLogByKey(key: string, text: string): TranslateSource;
    /**
     * 取得文字語系
     * @param text
     */
    private getTextLanguage;
    /**
     * 紀錄無法翻譯資料
     * @param key
     * @param text
     */
    setCacheNonTranslate(key: string, text: string): void;
    /**
     * 移除空白換行
     * @param text
     */
    cleanWord(text: string): string;
    /**
     * 文字內容特殊字元 增加跳脫符號
     * @param text
     */
    private getRegexWord;
}
