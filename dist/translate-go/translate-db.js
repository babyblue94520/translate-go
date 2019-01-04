import { TranslateType, } from './translate.interface';
import { TranslateConfig, TranslateConst } from './config/translate-config';
/**
 * 翻譯資料庫
 */
var TranslateDB = /** @class */ (function () {
    function TranslateDB() {
        this._special = '([$/+?.。:：;；!！?？=＊*(){}|\\-\\^\\[\\]\\s\\r\\n\\\\]*)';
        this._startRegexStr = '^' + this._special;
        this._endRegexStr = this._special + '$';
        // 不區分大小寫
        this._modifier = 'i';
        // 清除前後特殊字元
        this._cleanRegex = new RegExp(this._startRegexStr + '|' + this._endRegexStr, 'g');
        // 清除前特殊字元
        this._cleanStartRegex = new RegExp(this._startRegexStr, 'g');
        // 清除後特殊字元
        this._cleanEndRegex = new RegExp(this._endRegexStr, 'g');
        // 將文字內的特殊字元跳脫
        this._jumpRegex = new RegExp('([$/*+?.(){}|\\^\\[\\]\\\\])', 'g');
        // 翻譯資源
        this._wordSource = {};
        // 翻譯資源
        this._keySource = {};
        // 翻譯文字的表示式
        this._wordRegexs = {};
        // 文字對照語系
        this._textLangs = {};
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
        var dbSource;
        for (var key in data) {
            source = data[key];
            dbSource = {
                source: source,
                regexps: {},
                replaces: {}
            };
            for (var lang in source) {
                var word = String(source[lang]);
                var cleanWord = void 0;
                if (lang == TranslateConst.Key) {
                    this._keySource[key] = dbSource;
                }
                else {
                    // 處理中間要保留的文字
                    var strs = word.split('(.+)');
                    if (strs.length > 1) {
                        var replace = '$1';
                        strs[0] = this.getRegexWord(strs[0].replace(this._cleanStartRegex, ''));
                        replace += strs[0] + '$2';
                        var i = 1, l = strs.length - 1;
                        for (; i < l; i++) {
                            strs[i] = this.getRegexWord(strs[i]);
                            replace += strs[i] + '$' + (i + 2);
                        }
                        if (i < strs.length) {
                            strs[i] = this.getRegexWord(strs[i].replace(this._cleanEndRegex, ''));
                            replace += strs[i] + '$' + (i + 2);
                        }
                        dbSource.regexps[lang] = this._wordRegexs[word] = new RegExp(this._startRegexStr + strs.join('(.+)') + this._endRegexStr, this._modifier);
                        dbSource.replaces[lang] = replace;
                    }
                    else {
                        cleanWord = this.cleanWord(word);
                        dbSource.regexps[lang] = this._wordRegexs[word] = new RegExp(this._startRegexStr + this.getRegexWord(cleanWord) + this._endRegexStr, this._modifier);
                        dbSource.replaces[lang] = '$1' + cleanWord + '$2';
                    }
                    this._wordSource[word] = dbSource;
                    this._textLangs[word] = lang;
                }
                if (TranslateConfig.dev) {
                    if (cleanWord != undefined) {
                        delete this._cacheNonTranslateText[cleanWord];
                    }
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
            var dbSource = this._wordSource[text];
            if (dbSource) {
                return dbSource.source[language] || result;
            }
            var translateSource = this.getTranslateSource(text);
            if (translateSource) {
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
        var dbSource = this._keySource[key];
        if (dbSource) {
            result = dbSource.source[language] || result;
            dbSource.currentLanguage = language;
            dbSource.translateText = result;
            dbSource.currentText = result;
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
        var translateText = source.dbSource.source[language];
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
            // 更新
            source.translateText = translateText;
            source.currentText = text.replace(source.dbSource.regexps[source.currentLanguage], source.dbSource.replaces[language]);
            source.currentLanguage = language;
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
            var dbSource = this._wordSource[textLanguage.text];
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
    };
    /**
     * 檢查是否需要翻譯並回傳翻譯資料
     * @param text
     */
    TranslateDB.prototype.getTranslateSourceByKey = function (key) {
        var dbSource = this._keySource[key];
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
        var language = this._textLangs[text];
        if (language) {
            return {
                language: language,
                text: text
            };
        }
        // 清除文字特殊字元
        var cleanText = this.cleanWord(text);
        if (cleanText.length == 0) {
            return;
        }
        // 第二次嘗試取得語系
        language = this._textLangs[cleanText];
        if (language) {
            return {
                language: language,
                text: cleanText
            };
        }
        // 透過表達式找出語系
        var regex;
        for (var word in this._textLangs) {
            regex = this._wordRegexs[word];
            if (regex.test(cleanText)) {
                return {
                    language: this._textLangs[word],
                    text: word
                };
            }
        }
        if (TranslateConfig.dev && cleanText) {
            if (isNaN(Number(cleanText)) && !/^[0-9]+$/.test(cleanText)) {
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
     * 移除空白換行
     * @param text
     */
    TranslateDB.prototype.cleanWord = function (text) {
        // 清除空白
        return text.replace(this._cleanRegex, '');
    };
    /**
     * 文字內容特殊字元 增加跳脫符號
     * @param text
     */
    TranslateDB.prototype.getRegexWord = function (text) {
        return text.replace(this._jumpRegex, '\\$1');
    };
    return TranslateDB;
}());
export { TranslateDB };
//# sourceMappingURL=translate-db.js.map