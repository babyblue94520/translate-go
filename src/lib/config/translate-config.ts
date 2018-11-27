export class TranslateConst {
    public static readonly Repeat = 'repeat';
    public static readonly Type = 'type';
    // TranslateSource key name
    public static readonly Key = 'key';
    // 忽略Key
    public static readonly IgnoreKeyArray = ['key', 'type', 'repeat'];
    // 忽略標籤
    public static readonly IgnoreTagArray = ['SCRIPT', 'LINK', 'META', 'STYLE'];
    // 忽略Attribute
    public static readonly IgnoreAttributeName = 'nottranslate';
    // translate attribute name
    public static readonly Translatekey = 'translatekey';
    // placeholder translate attribute name
    public static readonly PlaceholderTranslatekey = 'placeholdertranslatekey';
    // TranslateGO 在window 中的名稱
    public static readonly Prefix = '__translateGO';
    // TranslateGO Translate Data在window的前綴
    public static readonly GroupPrefix = TranslateConst.Prefix + '_';
    // TranslateGO 在window 中的名稱
    public static readonly ConfigPrefix = '__translateConfig';
}

export let TranslateConfig = {
    dev: false,
    defaultLanguage: 'en'
};
window[TranslateConst.ConfigPrefix] = TranslateConfig;
