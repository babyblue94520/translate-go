import {
    TextLanguage,
    TranslateRegexs,
    TranslateSource,
    TranslateType
} from './translate.interface';
import { TranslateConfig, TranslateConst } from './config/translate-config';


/**
 * 翻譯資料庫
 */
export class TranslateDB {
    // 盡量搜尋純文字的內容
    private _specialChars = '[.。:：;；!！?？{}()=＊*\\[\\]\\s\\r\\n]';
    private _startRegexStr = '(^[{(＊*\\[\\s\\r\\n]?)';
    private _endRegexStr = '([.。:：;；!！?？=＊*\\]\\s\\r\\n]?$)';
    // 換行等等
    private _cleanChars = '[\\r\\n]';
    // 不區分大小寫
    private _modifier = 'i';
    // 清除空白換行
    private _cleanRegex = new RegExp(this._cleanChars + '+', 'g');
    // 文字內的特殊字元 Regexp
    private _textReplaceSpecialCharsRegex = new RegExp('(' + this._specialChars + ')', 'g');
    // 翻譯資源
    private _wordSource = {};
    // 翻譯資源
    private _keySource = {};
    // 翻譯文字的表示式
    private _wordRegexs = [];
    // 文字對照語系
    private _textLanguageData = {};
    // 語系資料
    private _langs = [];
    // 無法翻譯資料
    private _cacheNonTranslateText = {};

    constructor() {

    }

    public getLanguages(): Array<string> {
        return this._langs;
    }

    /**
     * 是否有該語系翻譯資料
     * @param language
     */
    public hasLanguage(language: string): boolean {
        return this._langs.indexOf(language) != -1;
    }

    /**
     * 載入文字多語資料
     * @param data
     */
    public insert(data: any): void {
        let source;
        for (let key in data) {
            source = data[key];
            for (let lang in source) {
                let word = String(source[lang]);
                if (lang == TranslateConst.Key) {
                    this._keySource[key] = source;
                } else {
                    this._wordSource[word] = source;
                    this._wordRegexs[word] = new RegExp(this._startRegexStr + this.getRegexText(word) + this._endRegexStr, this._modifier);
                    this._textLanguageData[word] = lang;
                }
                if (TranslateConfig.dev) {
                    delete this._cacheNonTranslateText[word];
                    delete this._cacheNonTranslateText[key];
                }
            }
        }
        if (source) {
            for (let lang in source) {
                if (lang != TranslateConst.Key && this._langs.indexOf(lang) == -1) {
                    this._langs.push(lang);
                }
            }
        }
    }

    /**
     * 取得無法翻譯的文字
     */
    public getNonTranslate(): any {
        return this._cacheNonTranslateText;
    }

    /**
     * 翻譯文字
     * @param text
     * @param language
     */
    public translate(text: string, language: string): string {
        let result = text;
        text = String(text);
        if (text.length > 0) {
            let source = this.getWordSource(text);
            if (source) {
                return source[language] || result;
            }
            let translateSource = this.getTranslateSource(text);
            if (source) {
                return this.translateBySource(text, translateSource, language) || result;
            }
        }
        return result;
    }

    /**
     * 翻譯文字依Key
     * @param key
     * @param language
     */
    public translateByKey(key: string, language): string {
        let result;
        let source = this._keySource[key];
        if (source) {
            result = source[language] || result;
            source.currentLanguage = language;
            source.translateText = result;
            source.currentText = result;
        }
        return result;
    }

    /**
     * 翻譯文字依source
     * @param text
     * @param source
     * @param language
     */
    public translateBySource(text: string, source: TranslateSource, language: string): string {
        let translateText = source.wordSource[language];
        if (source.type == TranslateType.key) {
            source.currentLanguage = language;
            source.translateText = translateText;
            source.currentText = translateText;
            return translateText;
        } else {
            if (translateText == undefined) {
                return;
            }
            let regex = source.translateRegexs[source.currentLanguage];
            // 更新
            source.currentLanguage = language;
            source.translateText = translateText;
            source.currentText = text.replace(regex, '$1' + translateText + '$2');
            return source.currentText;
        }
    }

    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    public getTranslateSource(text: string): TranslateSource {
        let textLanguage = this.getTextLanguage(text);
        if (textLanguage) {
            let translateRegexs: TranslateRegexs = {};
            let wordSource = this.getWordSource(textLanguage.text);
            if (wordSource) {
                for (let lang in wordSource) {
                    translateRegexs[lang] = this.getWordRegex(wordSource[lang]);
                }
                return {
                    type: TranslateType.none,
                    translateText: textLanguage.text,
                    currentLanguage: textLanguage.language,
                    wordSource: wordSource,
                    translateRegexs: translateRegexs,
                    currentText: text
                };
            }
        }
    }

    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    public getTranslateSourceByKey(key: string): TranslateSource {
        let source = this._keySource[key];
        if (source) {
            return {
                type: TranslateType.key,
                translateText: null,
                currentLanguage: null,
                wordSource: source,
                translateRegexs: null,
                currentText: null
            };
        }
        return undefined;
    }

    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * 額外記錄沒有key
     * @param text
     */
    public getTranslateSourceAndLogByKey(key: string, text: string): TranslateSource {
        let result = this.getTranslateSourceByKey(key);
        if (TranslateConfig.dev && result == undefined) {
            this.setCacheNonTranslate(key, text);
        }
        return result;
    }

    /**
     * 取得文字語系
     * @param text
     */
    private getTextLanguage(text: string): TextLanguage {
        // 第一次嘗試取得語系
        let language = this._textLanguageData[text];
        if (language) {
            return {
                language: language,
                text: text
            };
        }
        // 清除文字特殊字元
        let cleanText = this.getCleanText(text);
        if (cleanText.length == 0) { return; }
        // 第二次嘗試取得語系
        language = this._textLanguageData[cleanText];
        if (language) {
            return {
                language: language,
                text: cleanText
            };
        }
        // 透過表達式找出語系
        let regex: RegExp;
        for (let word in this._textLanguageData) {
            regex = this.getWordRegex(word);
            if (regex.test(cleanText)) {
                return {
                    language: this._textLanguageData[word],
                    text: word
                };
            }
        }
        if (TranslateConfig.dev && cleanText) {
            let t = cleanText.replace(/[&@#$%^\[\]'"～`~<>,，+-_.。:：;；!！?？{}()=＊*\/\[\]\s\r\n]/g, '');
            // if (isNaN(Number(t)) && !/^[a-zA-Z0-9]+$/.test(t)) {
            if (isNaN(Number(t)) && !/^[0-9]+$/.test(t)) {
                this.setCacheNonTranslate('', cleanText);
            }
        }
    }

    /**
     * 紀錄無法翻譯資料
     * @param key
     * @param text
     */
    public setCacheNonTranslate(key: string, text: string) {
        let source = {};
        source[TranslateConst.Key] = key;
        source[TranslateConfig.defaultLanguage] = text;
        this._cacheNonTranslateText[key || text] = source;
    }

    /**
     * 取得文字翻譯資源
     * @param word
     */
    public getWordSource(word: string): object {
        return this._wordSource[word];
    }

    /**
     * 取得文字表達式
     * @param word
     */
    private getWordRegex(word: string): RegExp {
        return this._wordRegexs[word];
    }

    /**
     * 移除空白換行
     * @param text
     */
    public getCleanText(text: string): string {
        if (text) {
            // 清除空白
            return text.replace(this._cleanRegex, '').replace(/(^[\s]+|[\s]+$)/g, '');
        }
        return text;
    }

    /**
     * 文字內容特殊字元 增加跳脫符號
     * @param text
     */
    private getRegexText(text: string): string {
        return text.replace(this._textReplaceSpecialCharsRegex, '\\$1');
    }
}
