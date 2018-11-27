var TranslateConst = /** @class */ (function () {
    function TranslateConst() {
    }
    TranslateConst.Repeat = 'repeat';
    TranslateConst.Type = 'type';
    // TranslateSource key name
    TranslateConst.Key = 'key';
    // 忽略Key
    TranslateConst.IgnoreKeyArray = ['key', 'type', 'repeat'];
    // 忽略標籤
    TranslateConst.IgnoreTagArray = ['SCRIPT', 'LINK', 'META', 'STYLE'];
    // 忽略Attribute
    TranslateConst.IgnoreAttributeName = 'nottranslate';
    // translate attribute name
    TranslateConst.Translatekey = 'translatekey';
    // placeholder translate attribute name
    TranslateConst.PlaceholderTranslatekey = 'placeholdertranslatekey';
    // TranslateGO 在window 中的名稱
    TranslateConst.Prefix = '__translateGO';
    // TranslateGO Translate Data在window的前綴
    TranslateConst.GroupPrefix = TranslateConst.Prefix + '_';
    // TranslateGO 在window 中的名稱
    TranslateConst.ConfigPrefix = '__translateConfig';
    return TranslateConst;
}());
export { TranslateConst };
export var TranslateConfig = {
    dev: false,
    defaultLanguage: 'en'
};
window[TranslateConst.ConfigPrefix] = TranslateConfig;
//# sourceMappingURL=translate-config.js.map