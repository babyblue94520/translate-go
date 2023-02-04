import { TranslateArgs, TranslateGroupSource, TranslateLanguageSource, TranslateSource } from "./interface";
export default class TranslateDB {
    private readonly keyRegexp;
    private readonly groups;
    private readonly notFoundKeys;
    private readonly groupSource;
    private cacheResult;
    load(language: string, source: TranslateSource, group: string): void;
    getNotFoundKeys(): TranslateLanguageSource;
    get(key: string, args: TranslateArgs, language: string, group?: string): string;
    getGroups(): string[];
    getGroupSource(): TranslateGroupSource;
    getLanguageSource(group: string): TranslateLanguageSource;
    removeLanguageSource(group: string): void;
    clearCache(): void;
    private updateGroups;
    private findAll;
    private find;
    private getText;
    private isEmpty;
    private getCache;
    private getSource;
    private getNotFoundSource;
}
