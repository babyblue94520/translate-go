import { TranslateType } from './translate.interface';
import { TranslateConfig, TranslateConst } from './config/translate-config';
/**
 * 翻譯資料庫
 */
var TranslateDB = /** @class */ (function () {
    function TranslateDB() {
        // 盡量搜尋純文字的內容
        this._specialChars = '[.。:：;；!！?？{}()=＊*\\[\\]\\s\\r\\n]';
        this._startRegexStr = '(^[{(＊*\\[\\s\\r\\n]?)';
        this._endRegexStr = '([.。:：;；!！?？=＊*\\]\\s\\r\\n]?$)';
        // 換行等等
        this._cleanChars = '[\\r\\n]';
        // 不區分大小寫
        this._modifier = 'i';
        // 清除空白換行
        this._cleanRegex = new RegExp(this._cleanChars + '+', 'g');
        // 文字內的特殊字元 Regexp
        this._textReplaceSpecialCharsRegex = new RegExp('(' + this._specialChars + ')', 'g');
        // 翻譯資源
        this._wordSource = {};
        // 翻譯資源
        this._keySource = {};
        // 翻譯文字的表示式
        this._wordRegexs = [];
        // 文字對照語系
        this._textLanguageData = {};
        // 語系資料
        this._langs = [];
        // 無法翻譯資料
        this._cacheNonTranslateText = {};
    }
    TranslateDB.prototype.getLanguages = function () {
        return this._langs;
    };
    /**
     * 是否有該語系翻譯資料
     * @param language
     */
    TranslateDB.prototype.hasLanguage = function (language) {
        return this._langs.indexOf(language) != -1;
    };
    /**
     * 載入文字多語資料
     * @param data
     */
    TranslateDB.prototype.insert = function (data) {
        var source;
        for (var key in data) {
            source = data[key];
            for (var lang in source) {
                var word = String(source[lang]);
                if (lang == TranslateConst.Key) {
                    this._keySource[key] = source;
                }
                else {
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
            for (var lang in source) {
                if (lang != TranslateConst.Key && this._langs.indexOf(lang) == -1) {
                    this._langs.push(lang);
                }
            }
        }
    };
    /**
     * 取得無法翻譯的文字
     */
    TranslateDB.prototype.getNonTranslate = function () {
        return this._cacheNonTranslateText;
    };
    /**
     * 翻譯文字
     * @param text
     * @param language
     */
    TranslateDB.prototype.translate = function (text, language) {
        var result = text;
        text = String(text);
        if (text.length > 0) {
            var source = this.getWordSource(text);
            if (source) {
                return source[language] || result;
            }
            var translateSource = this.getTranslateSource(text);
            if (source) {
                return this.translateBySource(text, translateSource, language) || result;
            }
        }
        return result;
    };
    /**
     * 翻譯文字依Key
     * @param key
     * @param language
     */
    TranslateDB.prototype.translateByKey = function (key, language) {
        var result;
        var source = this._keySource[key];
        if (source) {
            result = source[language] || result;
            source.currentLanguage = language;
            source.translateText = result;
            source.currentText = result;
        }
        return result;
    };
    /**
     * 翻譯文字依source
     * @param text
     * @param source
     * @param language
     */
    TranslateDB.prototype.translateBySource = function (text, source, language) {
        var translateText = source.wordSource[language];
        if (source.type == TranslateType.key) {
            source.currentLanguage = language;
            source.translateText = translateText;
            source.currentText = translateText;
            return translateText;
        }
        else {
            if (translateText == undefined) {
                return;
            }
            var regex = source.translateRegexs[source.currentLanguage];
            // 更新
            source.currentLanguage = language;
            source.translateText = translateText;
            source.currentText = text.replace(regex, '$1' + translateText + '$2');
            return source.currentText;
        }
    };
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    TranslateDB.prototype.getTranslateSource = function (text) {
        var textLanguage = this.getTextLanguage(text);
        if (textLanguage) {
            var translateRegexs = {};
            var wordSource = this.getWordSource(textLanguage.text);
            if (wordSource) {
                for (var lang in wordSource) {
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
    };
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    TranslateDB.prototype.getTranslateSourceByKey = function (key) {
        var source = this._keySource[key];
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
    };
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * 額外記錄沒有key
     * @param text
     */
    TranslateDB.prototype.getTranslateSourceAndLogByKey = function (key, text) {
        var result = this.getTranslateSourceByKey(key);
        if (TranslateConfig.dev && result == undefined) {
            this.setCacheNonTranslate(key, text);
        }
        return result;
    };
    /**
     * 取得文字語系
     * @param text
     */
    TranslateDB.prototype.getTextLanguage = function (text) {
        // 第一次嘗試取得語系
        var language = this._textLanguageData[text];
        if (language) {
            return {
                language: language,
                text: text
            };
        }
        // 清除文字特殊字元
        var cleanText = this.getCleanText(text);
        if (cleanText.length == 0) {
            return;
        }
        // 第二次嘗試取得語系
        language = this._textLanguageData[cleanText];
        if (language) {
            return {
                language: language,
                text: cleanText
            };
        }
        // 透過表達式找出語系
        var regex;
        for (var word in this._textLanguageData) {
            regex = this.getWordRegex(word);
            if (regex.test(cleanText)) {
                return {
                    language: this._textLanguageData[word],
                    text: word
                };
            }
        }
        if (TranslateConfig.dev && cleanText) {
            var t = cleanText.replace(/[&@#$%^\[\]'"～`~<>,，+-_.。:：;；!！?？{}()=＊*\/\[\]\s\r\n]/g, '');
            // if (isNaN(Number(t)) && !/^[a-zA-Z0-9]+$/.test(t)) {
            if (isNaN(Number(t)) && !/^[0-9]+$/.test(t)) {
                this.setCacheNonTranslate('', cleanText);
            }
        }
    };
    /**
     * 紀錄無法翻譯資料
     * @param key
     * @param text
     */
    TranslateDB.prototype.setCacheNonTranslate = function (key, text) {
        var source = {};
        source[TranslateConst.Key] = key;
        source[TranslateConfig.defaultLanguage] = text;
        this._cacheNonTranslateText[key || text] = source;
    };
    /**
     * 取得文字翻譯資源
     * @param word
     */
    TranslateDB.prototype.getWordSource = function (word) {
        return this._wordSource[word];
    };
    /**
     * 取得文字表達式
     * @param word
     */
    TranslateDB.prototype.getWordRegex = function (word) {
        return this._wordRegexs[word];
    };
    /**
     * 移除空白換行
     * @param text
     */
    TranslateDB.prototype.getCleanText = function (text) {
        if (text) {
            // 清除空白
            return text.replace(this._cleanRegex, '').replace(/(^[\s]+|[\s]+$)/g, '');
        }
        return text;
    };
    /**
     * 文字內容特殊字元 增加跳脫符號
     * @param text
     */
    TranslateDB.prototype.getRegexText = function (text) {
        return text.replace(this._textReplaceSpecialCharsRegex, '\\$1');
    };
    return TranslateDB;
}());
export { TranslateDB };
//# sourceMappingURL=translate-db.js.map