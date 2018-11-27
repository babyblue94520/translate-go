export interface ITranslateConfig {
    dev: boolean;
    defaultLanguage: string;
}
export declare const TranslateConst: {
    Repeat: string;
    Type: string;
    Key: string;
    IgnoreKeyArray: string[];
    IgnoreTagArray: string[];
    IgnoreAttributeName: string;
    Translatekey: string;
    PlaceholderTranslatekey: string;
    Prefix: string;
    GroupPrefix: string;
    ConfigPrefix: string;
};
export declare let TranslateConfig: ITranslateConfig;
