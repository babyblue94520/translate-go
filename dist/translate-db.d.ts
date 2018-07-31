import { ITranslateSource } from './translate.interface';
/**
 * 翻譯資料庫
 */
export declare class TranslateDB {
    private _dev;
    private _specialChars;
    private _startRegexStr;
    private _endRegexStr;
    private _cleanChars;
    private _modifier;
    private _cleanRegex;
    private _textReplaceSpecialCharsRegex;
    private _wordSource;
    private _keySource;
    private _wordRegexs;
    private _textLanguageData;
    private _langs;
    private _cacheNonTranslateText;
    constructor(_dev: any);
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
    getNonTranslate(): object;
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
    translateBySource(text: string, source: ITranslateSource, language: string): string;
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    getTranslateSource(text: string): ITranslateSource;
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    getTranslateSourceByKey(key: string): ITranslateSource;
    /**
     * 取得文字語系
     * @param text
     */
    private getTextLanguage;
    /**
     * 取得文字翻譯資源
     * @param word
     */
    getWordSource(word: string): object;
    /**
     * 取得文字表達式
     * @param word
     */
    private getWordRegex;
    /**
     * 移除空白換行
     * @param text
     */
    getCleanText(text: string): string;
    /**
     * 文字內容特殊字元 增加跳脫符號
     * @param text
     */
    private getRegexText;
}
