export interface TranslateGroup {
  value: string;
  temp: string
}

export interface TranslateArgs {
  [key: string]: string;
}

export interface TranslateSource {
  [key: string]: string;
}

export interface TranslateLanguageSource {
  [key: string]: TranslateSource;
}

export interface TranslateGroupSource {
  [key: string]: TranslateLanguageSource;
}

export interface TranslateFile {
  name: string;
  language: string
  content: string;
}

export interface TranslateRecord {
  key?: string;
}

export interface Translate {
  group: string;
  key: string;
  language: string;
  message: string;
}

export interface GroupTranslateRecord {
  [key: string]: TranslateRecord[];
}

export interface TranslateChanges {
  change: boolean;
  adds: Translate[];
  modifies: Translate[];
  removes: Translate[];
}

export interface TranslateOnSave {
  (changes: TranslateChanges): void
}

export interface TranslateOnLanguageChange {
  (language: string): void
}

export interface TranslateToolbar {
  start(): void;
  stop(): void;
  onSave: TranslateOnSave;
}
