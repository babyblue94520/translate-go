
export enum TranslateType {
    none,
    key
}

export interface TranslateNode extends Text {
    translateTextSource: TranslateSource;
    translated: boolean;
}

export interface LangRegExps {
    [lang: string]: RegExp;
}
export interface LangReplaces {
    [lang: string]: string;
}
export interface DbSource {
    source: TranslateGroupSource;
    regexps: LangRegExps;
    replaces: LangReplaces;
}

export interface TranslateSource {
    type: TranslateType;
    dbSource: DbSource;
    currentLanguage: string;
    translateText: string;
    currentText: string;
}

export interface TranslateRegexs {
    [lang: string]: RegExp;
}

export interface TextLanguage {
    language: string;
    text: string;
}


export interface TranslateGroupSource {
    [lang: string]: string;
}

export interface TranslateGroup {
    name: string;
    sources: TranslateGroupSource[];
}

export interface TranslateKeySource {
    [key: string]: TranslateGroupSource;
}

