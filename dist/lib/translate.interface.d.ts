export interface ITranslateNode extends Text {
    translateTextSource: ITranslateSource;
    translated: boolean;
}
export interface ITranslateSource {
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
