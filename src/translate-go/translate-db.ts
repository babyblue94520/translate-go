import { TranslateArgs, TranslateGroupSource, TranslateLanguageSource, TranslateSource } from "./interface";

interface KeyMatchs {
  [key: string]: boolean;
}

export default class TranslateDB {
  private readonly keyRegexp = new RegExp('([^$]?)\{([^{}]+)}', 'g');

  private readonly groups = [];
  private readonly notFoundKeys: TranslateLanguageSource = {};
  private readonly groupSource: TranslateGroupSource = {};

  private cacheResult: TranslateGroupSource = {};


  public load(language: string, source: TranslateSource, group: string) {
    let target = this.getSource(group, language);
    let cache = this.getCache(group, language);
    for (let key in source) {
      target[key] = source[key];
      cache[key] = '';
      delete this.getNotFoundSource(language)[key];
    }
    this.updateGroups();
  }

  public getNotFoundKeys(): TranslateLanguageSource {
    return this.notFoundKeys;
  }

  public get(key: string, args: TranslateArgs = {}, language: string, group?: string): string {
    let text;
    if (group) {
      text = this.find(key, args, language, group);
    } else {
      text = this.findAll(key, args, language)
    }
    if (!text) {
      console.warn(key, 'translate source not found.');
    }
    return text;
  }

  public getGroups(): string[] {
    return this.groups;
  }

  public getGroupSource(): TranslateGroupSource {
    return this.groupSource;
  }

  public getLanguageSource(group: string): TranslateLanguageSource {
    return this.groupSource[group];
  }

  public removeLanguageSource(group: string) {
    delete this.groupSource[group];
    this.updateGroups();
  }

  public clearCache() {
    this.cacheResult = {};
  }

  private updateGroups() {
    this.groups.length = 0;
    for (let group in this.groupSource) {
      this.groups.push(group);
    }
    this.groups.sort();
  }

  private findAll(key: string, args: TranslateArgs, language: string) {
    let result = key;
    for (let group in this.groupSource) {
      let result = this.find(key, args, language, group);
      if (result != key) return result;
    }
    return result;
  }

  private find(key: string, args: TranslateArgs, language: string, group: string, prevMatchKeys: KeyMatchs = {}): string {
    if (!key) { return key; }
    let cache = this.getCache(group, language);
    let result = cache[key];
    if (result) { return result; }
    if (typeof key != 'string') {
      console.warn('key must be a string.');
      return key;
    }

    let presentMatchKeys = {};
    let matchCount = 0;
    result = key.replace(this.keyRegexp, (...matchs) => {
      matchCount++;
      let match = matchs[2];
      if (!prevMatchKeys[match]) {
        let text = this.getText(match, args, language, group);
        if (text != undefined) {
          if (this.keyRegexp.test(text)) {
            presentMatchKeys[match] = true;
          }
          return matchs[1] + text;
        }
      }
      return matchs[0];
    });

    if (matchCount == 0) {
      return key;
    }
    if (this.isEmpty(presentMatchKeys)) {
      if (this.isEmpty(args)) {
        cache[key] = result;
      }
      return result;
    } else {
      for (let name in presentMatchKeys) {
        prevMatchKeys[name] = presentMatchKeys[name];
      }
      return this.find(result, args, language, group, prevMatchKeys);
    }
  }

  private getText(key: string, args: TranslateArgs, language: string, group: string): string {
    let result = args[key];
    if (result != undefined) {
      return result;
    }
    let source = this.getSource(group, language);
    result = source[key];
    if (result) {
      return result;
    } else {
      this.getNotFoundSource(language)[key] = key;
      return undefined;
    }
  }

  private isEmpty(object): boolean {
    for (let i in object) {
      return false;
    }
    return true;
  }

  private getCache(group: string, language: string): TranslateSource {
    let temp = (this.cacheResult[group] || (this.cacheResult[group] = {}));
    return temp[language] || (temp[language] = {});
  }

  private getSource(group: string, language: string): TranslateSource {
    let temp = (this.groupSource[group] || (this.groupSource[group] = {}));
    return temp[language] || (temp[language] = {});
  }

  private getNotFoundSource(language: string): TranslateSource {
    return this.notFoundKeys[language] || (this.notFoundKeys[language] = {});
  }
}
