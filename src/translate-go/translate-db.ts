import {
    TextLanguage,
    TranslateSource,
    TranslateType,
    DbSource,
} from './translate.interface';
import { TranslateConfig, TranslateConst } from './config/translate-config';


/**
 * 翻譯資料庫
 */
export class TranslateDB {
    private _startRegexStr = '^([{(＊*\\[\\s\\r\\n]*)';
    private _endRegexStr = '([.。:：;；!！?？=＊*\\]\\s\\r\\n]*)$';
    // 不區分大小寫
    private _modifier = 'i';
    // 清除換行、前後空白
    private _cleanRegex = new RegExp(this._startRegexStr + '|' + this._endRegexStr, 'g');
    // 將文字內的特殊字元跳脫
    private _jumpRegex = new RegExp('([\/\\^$*+?.(){}|\[\]])', 'g');
    // 翻譯資源
    private _wordSource = {};
    // 翻譯資源
    private _keySource = {};
    // 翻譯文字的表示式
    private _wordRegexs = [];
    // 文字對照語系
    private _textLangs = {};
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
        let dbSource: DbSource;
        for (let key in data) {
            source = data[key];
            dbSource = {
                source: source,
                regexps: {},
                replaces: {}
            };
            for (let lang in source) {
                let word = String(source[lang]);
                if (lang == TranslateConst.Key) {
                    this._keySource[key] = dbSource;
                } else {
                    // 處理中間要保留的文字
                    let strs = word.split('(.+)');
                    if (strs.length > 1) {
                        let replace = '$1';
                        for (let i in strs) {
                            strs[i] = this.getRegexText(strs[i]);
                            replace += strs[i] + '$' + (Number(i) + 2);
                        }
                        dbSource.regexps[lang] = this._wordRegexs[word] = new RegExp(this._startRegexStr + strs.join('(.+)') + this._endRegexStr, this._modifier);
                        dbSource.replaces[lang] = replace;
                    } else {
                        dbSource.regexps[lang] = this._wordRegexs[word] = new RegExp(this._startRegexStr + this.getRegexText(word) + this._endRegexStr, this._modifier);
                        dbSource.replaces[lang] = '$1' + word + '$2';
                    }
                    this._wordSource[word] = dbSource;
                    this._textLangs[word] = lang;
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
            let dbSource = this._wordSource[text];
            if (dbSource) {
                return dbSource.source[language] || result;
            }
            let translateSource = this.getTranslateSource(text);
            if (translateSource) {
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
        let dbSource = this._keySource[key];
        if (dbSource) {
            result = dbSource.source[language] || result;
            dbSource.currentLanguage = language;
            dbSource.translateText = result;
            dbSource.currentText = result;
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
        let translateText = source.dbSource.source[language];
        if (source.type == TranslateType.key) {
            source.currentLanguage = language;
            source.translateText = translateText;
            source.currentText = translateText;
            return translateText;
        } else {
            if (translateText == undefined) {
                return;
            }
            // 更新
            source.translateText = translateText;
            source.currentText = text.replace(source.dbSource.regexps[source.currentLanguage], source.dbSource.replaces[language]);
            source.currentLanguage = language;
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
            let dbSource = this._wordSource[textLanguage.text];
            if (dbSource) {
                return {
                    type: TranslateType.none,
                    translateText: textLanguage.text,
                    currentLanguage: textLanguage.language,
                    dbSource: dbSource,
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
        let dbSource = this._keySource[key];
        if (dbSource) {
            return {
                type: TranslateType.key,
                translateText: null,
                currentLanguage: null,
                dbSource: dbSource,
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
        let language = this._textLangs[text];
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
        language = this._textLangs[cleanText];
        if (language) {
            return {
                language: language,
                text: cleanText
            };
        }
        // 透過表達式找出語系
        let regex: RegExp;
        for (let word in this._textLangs) {
            regex = this._wordRegexs[word];
            if (regex.test(cleanText)) {
                return {
                    language: this._textLangs[word],
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
     * 移除空白換行
     * @param text
     */
    public getCleanText(text: string): string {
        // 清除空白
        return text.replace(this._cleanRegex, '');
    }

    /**
     * 文字內容特殊字元 增加跳脫符號
     * @param text
     */
    private getRegexText(text: string): string {
        return this.getCleanText(text).replace(this._jumpRegex, '\\$1');
    }
}
