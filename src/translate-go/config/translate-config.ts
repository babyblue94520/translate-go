import { environment } from "@environment";

export interface ITranslateConfig {
    dev: boolean;
    defaultLanguage: string;
}

export const TranslateConst = {
    Repeat: 'repeat',
    Type: 'type',
    // TranslateSource key name
    Key: 'key',
    // 忽略Key
    IgnoreKeyArray: ['key', 'type', 'repeat'],
    // 忽略標籤
    IgnoreTagArray: ['SCRIPT', 'LINK', 'META', 'STYLE'],
    // 忽略Attribute
    IgnoreAttributeName: 'nottranslate',
    // translate attribute name
    Translatekey: 'translatekey',
    // placeholder translate attribute name
    PlaceholderTranslatekey: 'placeholdertranslatekey',
    // TranslateGO 在window 中的名稱
    Prefix: '__translateGO',
    // TranslateGO Translate Data在window的前綴
    GroupPrefix: '__translateGO_',
    // TranslateGO 在window 中的名稱
    ConfigPrefix: '__translateGOConfig',
};
console.log('TranslateConst.ConfigPrefix', window[TranslateConst.ConfigPrefix]);
if (window[TranslateConst.ConfigPrefix] == undefined) {
    window[TranslateConst.ConfigPrefix] = {
        dev: !environment.production,
        defaultLanguage: 'en'
    };
}

export let TranslateConfig: ITranslateConfig = window[TranslateConst.ConfigPrefix];
