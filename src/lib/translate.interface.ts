export enum TranslateType {
    none,
    key
}

export interface ITranslateNode extends Text {
    translateTextSource: ITranslateSource;
    translated: boolean;
}

export interface ITranslateSource {
    type: TranslateType;
    wordSource: object;
    currentLanguage: string;
    translateRegexs: ITranslateRegexs;
    translateText: string;
    currentText: string;
}

export interface ITranslateRegexs {
    [lang: string]: RegExp;
}

export interface ITextLanguage {
    language: string;
    text: string;
}
