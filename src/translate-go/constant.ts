
export enum TranslateEvent {
  SourceChanged = 'sourceChanged',
  LanguageChanged = 'languageChanged',
}

export enum Sort {
  ASC = 1
  , DESC = -1
}

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
