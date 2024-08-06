import { TranslateEvent } from './constant';
import { TranslateArgs, TranslateGroupSource, TranslateLanguageSource, TranslateSource } from './interface';
/**
 * 取得TranslateGO
 */
export declare function getTranslateGO(): TranslateGO;
export default class TranslateGO {
    private readonly listeners;
    private readonly ignoreMap;
    private readonly translateGroupMap;
    private readonly nodeMap;
    private readonly languageMapping;
    private readonly mutationObserver;
    private db;
    private language;
    private scanning;
    private languages;
    /**
     * 設定其它 language code 的對應
     * @param mapping {'zh':'zh-TW'}
     */
    setLanguageMapping(mapping: {
        [key: string]: string;
    }): void;
    getLanguage(): string;
    getLanguages(): string[];
    translate(language: string, force?: boolean): void;
    load(language: string, source: TranslateSource, group?: string): void;
    loadAll(languageSource: TranslateLanguageSource, group?: string): void;
    private doLoad;
    removeLanguageSource(group: string): void;
    clearSource(): void;
    isScanning(): boolean;
    start(): void;
    stop(): void;
    addEventListener(event: TranslateEvent, callback: Function, target?: any): void;
    removeEventListener(event: TranslateEvent, callback: Function): void;
    removeAllEventListener(target: any): void;
    get(key: string, args?: TranslateArgs, language?: string, group?: string): string;
    getNotFoundKeys(): TranslateLanguageSource;
    getGroups(): string[];
    getGroupSource(): TranslateGroupSource;
    getLanguageSource(group: string): TranslateLanguageSource;
    private doStart;
    private mutationObserverHandler;
    /**
     * 監聽 Element 新增跟異動事件
     */
    private addEvents;
    /**
     * 移除 Element 新增跟異動事件
     */
    private removeEvents;
    private scanAttribute;
    private scan;
    private scanText;
    private addNode;
    private ignore;
    private findGroup;
    private getParent;
    private findIndex;
    private doTranslate;
    private clearRemoveNode;
    private doClearRemoveNode;
    private clear;
}
