import { environment } from "@environment";
export var TranslateConst = {
    Repeat: 'repeat',
    Type: 'type',
    // TranslateSource value name
    Value: 'value',
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
    // placeholder translate attribute name
    Placeholder: 'placeholder',
    // TranslateGO 在window 中的名稱
    Prefix: '__translateGO',
    // TranslateGO Translate Data在window的前綴
    GroupPrefix: '__translateGO_',
    // TranslateGO 在window 中的名稱
    ConfigPrefix: '__translateGOConfig',
};
if (window[TranslateConst.ConfigPrefix] == undefined) {
    window[TranslateConst.ConfigPrefix] = {
        dev: !environment.production,
        defaultLanguage: 'en'
    };
}
export var TranslateConfig = window[TranslateConst.ConfigPrefix];
//# sourceMappingURL=translate-config.js.map