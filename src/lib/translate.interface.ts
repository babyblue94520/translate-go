
export enum TranslateType {
    none,
    key
}

export interface TranslateNode extends Text {
    translateTextSource: TranslateSource;
    translated: boolean;
}

export interface TranslateSource {
    type: TranslateType;
    wordSource: object;
    currentLanguage: string;
    translateRegexs: TranslateRegexs;
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

