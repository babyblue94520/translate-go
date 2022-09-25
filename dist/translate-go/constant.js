export var TranslateEvent;
(function (TranslateEvent) {
    TranslateEvent["SourceChanged"] = "sourceChanged";
    TranslateEvent["LanguageChanged"] = "languageChanged";
})(TranslateEvent || (TranslateEvent = {}));
export var Sort;
(function (Sort) {
    Sort[Sort["ASC"] = 1] = "ASC";
    Sort[Sort["DESC"] = -1] = "DESC";
})(Sort || (Sort = {}));
export const TranslateConst = {
    DefaultGroup: 'default',
    // 忽略標籤
    IgnoreTagArray: { 'SCRIPT': true, 'LINK': true, 'META': true, 'STYLE': true },
    // 忽略Attribute
    IgnoreAttributeName: 'nottranslate',
    // translate group attribute name
    TranslateGroup: 'translategroup',
    // translate key attribute name
    TranslateKey: 'translatekey',
    // TranslateGO 在window 中的名稱
    Prefix: '__translateGO',
    // TranslateGO 在window 中的名稱
    ConfigPrefix: '__translateConfig',
};
