import { Delay } from '../ts/lib/cui/core/decorators/delay';
import { EventListenerContainer } from '../ts/lib/cui/core/listener/event-listener-container';
import { TranslateConst, TranslateEvent } from './constant';
import { TranslateArgs, TranslateGroupSource, TranslateLanguageSource, TranslateSource } from './interface';
import TranslateNode from './nodes/translate-node';
import TranslateNodePlaceholder from './nodes/translate-node-placeholder';
import TranslateNodeSubmit from './nodes/translate-node-submit';
import TranslateNodeText from './nodes/translate-node-text';
import TranslateDB from './translate-db';


window['getTranslateGO'] = getTranslateGO;

/**
 * 取得TranslateGO
 */
export function getTranslateGO(): TranslateGO {
  if (window[TranslateConst.Prefix]) {
    return window[TranslateConst.Prefix];
  } else {
    return window[TranslateConst.Prefix] = new TranslateGO();
  }
}

export default class TranslateGO {
  private readonly listeners = new EventListenerContainer<TranslateEvent, Function>();
  private readonly ignoreMap = new Map<Node, boolean>();
  private readonly translateGroupMap = new Map<Node, string>();
  private readonly nodeMap = new Map<Node, TranslateNode>();

  private readonly languageMapping = {};

  private readonly mutationObserver = new MutationObserver((mutations) => {
    this.mutationObserverHandler(mutations);
  });

  private db: TranslateDB = new TranslateDB();

  private language = navigator.language;
  private scanning = false;
  private languages = [];


  /**
   * 設定其它 language code 的對應
   * @param mapping {'zh':'zh-TW'}
   */
  public setLanguageMapping(mapping: { [key: string]: string }): void {
    if (!mapping) return;
    for (let key in mapping) {
      this.languageMapping[key] = mapping[key];
    }
    let language = this.languageMapping[this.language] || this.language;
    if (this.language != language) {
      this.translate(language);
    }
  }

  public getLanguage(): string {
    return this.language;
  }
  public getLanguages(): string[] {
    return this.languages;
  }

  public translate(language: string, force = false) {
    language = this.languageMapping[language];
    if (!language) return;
    if (!force && this.language == language) return;
    this.language = language;
    this.doTranslate(this.nodeMap, force);
    this.listeners.dispatch(TranslateEvent.LanguageChanged);
  }

  public load(language: string, source: TranslateSource, group?: string) {
    this.doLoad(language, source, group);
    this.doStart();
    this.listeners.dispatch(TranslateEvent.SourceChanged);
  }

  public loadAll(languageSource: TranslateLanguageSource, group?: string) {
    for (let language in languageSource) {
      this.doLoad(language, languageSource[language], group);
    }
    this.doStart();
    this.listeners.dispatch(TranslateEvent.SourceChanged);
  }

  private doLoad(language: string, source: TranslateSource, group: string = TranslateConst.DefaultGroup) {
    if (this.languages.indexOf(language) == -1) {
      this.languages.push(language);
      this.languageMapping[language] = language;
    }
    this.db.load(language, source, group);
  }

  public removeLanguageSource(group: string) {
    this.db.removeLanguageSource(group);
    this.listeners.dispatch(TranslateEvent.SourceChanged);
  }

  public clearSource() {
    this.db = new TranslateDB();
    this.languages.length = 0;
  }

  public isScanning(): boolean {
    return this.scanning;
  }

  public start() {
    if (this.scanning) { return; }
    this.doStart();
  }

  public stop() {
    this.removeEvents();
    this.scanning = false;
    this.clear();
  }

  public addEventListener(event: TranslateEvent, callback: Function, target?: any) {
    this.listeners.addListener(event, callback, target);
  }

  public removeEventListener(event: TranslateEvent, callback: Function) {
    this.listeners.removeListener(event, callback);
  }

  public removeAllEventListener(target: any) {
    this.listeners.removeAllListener(target);
  }


  public get(key: string, args: TranslateArgs = {}, language: string = this.language, group?: string): string {
    return this.db.get(key, args, language, group);
  }

  public getNotFoundKeys(): TranslateLanguageSource {
    return this.db.getNotFoundKeys();
  }

  public getGroups(): string[] {
    return this.db.getGroups();
  }

  public getGroupSource(): TranslateGroupSource {
    return this.db.getGroupSource();
  }

  public getLanguageSource(group: string): TranslateLanguageSource {
    return this.db.getLanguageSource(group);
  }

  private doStart() {
    this.removeEvents();
    this.scanning = true;
    this.scan(document.head);
    this.scan(document.body);
    this.doTranslate(this.nodeMap, true);
  }

  private mutationObserverHandler(mutations: MutationRecord[]) {
    let map = new Map<Node, TranslateNode>();
    mutations.forEach((mutation) => {
      switch (mutation.type) {
        case 'attributes':
          this.scanAttribute(mutation.target, mutation.attributeName, map);
          break;
        case 'characterData':
          if (mutation.target instanceof Text) {
            this.scanText(mutation.target, map);
          }
          break;
        case 'childList':
          this.scan(<HTMLElement>mutation.target, map);
          break;
      }
    });
    if (map.size > 0) {
      this.doTranslate(map);
      this.clearRemoveNode();
    }
  }

  /**
   * 監聽 Element 新增跟異動事件
   */
  private addEvents() {
    if (this.scanning) {
      this.mutationObserver.observe(document.documentElement, {
        attributeFilter: ['value', 'type', TranslateConst.TranslateKey, TranslateConst.IgnoreAttributeName]
        , attributes: true
        , childList: true
        , characterData: true
        , subtree: true
      });
    }
  }

  /**
   * 移除 Element 新增跟異動事件
   */
  private removeEvents() {
    this.mutationObserver.disconnect();
  }

  private scanAttribute(target, key: string, map?: Map<Node, TranslateNode>) {
    key = key.toLowerCase();
    switch (key) {
      case TranslateConst.TranslateKey:
        let value = target.getAttribute(key);
        let translateNode: TranslateNode;
        if (target instanceof HTMLInputElement) {
          translateNode = new TranslateNodeSubmit(this, target, value);
          this.addNode(translateNode, map);
        } else {
          translateNode = new TranslateNodeText(this, target, value);
          this.addNode(translateNode, map);
        }
        break;
      case TranslateConst.IgnoreAttributeName:
        if (target.getAttribute(TranslateConst.IgnoreAttributeName) != 'false') {
          this.nodeMap.delete(target);
          this.translateGroupMap.delete(target);
          this.ignoreMap.set(target, true);
        }
        break;
      case 'value':
      case 'type':
        this.addNode(new TranslateNodeSubmit(this, target, this.findGroup(target)), map);
        break;
    }
  }

  private scan(node: HTMLElement, map?: Map<Node, TranslateNode>, index = -1) {
    // node is Text
    if (node instanceof Text) {
      this.scanText(node, map, index);
    } else if (node.nodeType == 1) {
      if (this.ignore(node)) { return; }
      let element = <HTMLElement>node;
      let key = element.getAttribute(TranslateConst.TranslateKey);
      if (element instanceof HTMLInputElement) {
        if (
          element.tagName == 'INPUT'
          && element.value != undefined
          && (element?.type || '').toLowerCase() == 'submit'
        ) {
          // find sumbit button
          this.addNode(new TranslateNodeSubmit(this, element, this.findGroup(element), key), map);
        } else if (element.placeholder != undefined && element.placeholder != '') {
          // find input or textarea placeholder
          this.addNode(new TranslateNodePlaceholder(this, element, this.findGroup(element), key), map);
        }
      } else {
        if (key) {
          this.addNode(new TranslateNodeText(this, element, this.findGroup(element), key), map);
        } else {
          element.childNodes.forEach((child, i) => {
            this.scan(<HTMLElement>child, map, i);
          });
        }
      }
    }
  }

  private scanText(node: Text, map?: Map<Node, TranslateNode>, index = -1) {
    let parent = this.getParent(node);
    if (this.ignore(parent)) { return; }
    // node is Text
    let key = parent.getAttribute(TranslateConst.TranslateKey);
    if (index == -1) {
      index = this.findIndex(parent, node);
    }
    this.addNode(new TranslateNodeText(this, parent, this.findGroup(parent), key, index), map);
  }

  private addNode(translateNode: TranslateNode, map?: Map<Node, TranslateNode>) {
    if (translateNode.match()) {
      this.nodeMap.set(translateNode.getNode(), translateNode);
      if (map) {
        map.set(translateNode.getNode(), translateNode);
      }
    }
  }

  private ignore(node: HTMLElement): boolean {
    if (node) {
      if (this.ignoreMap.get(node)) {
        return true;
      }
      if (this.translateGroupMap.get(node)) {
        return false;
      }
      if (node == document.documentElement) {
        return false;
      }
      if (node.nodeType == 1) {
        let element = <HTMLElement>node;
        if (TranslateConst.IgnoreTagArray[element.tagName]) {
          return true;
        }
        let value = element.getAttribute(TranslateConst.IgnoreAttributeName);
        if (value == undefined || value == 'false') {
          let ignore = this.ignore(this.getParent(element));
          if (ignore) {
            this.ignoreMap.set(element, true);
          } else {
            this.translateGroupMap.set(element, element.getAttribute(TranslateConst.TranslateGroup) || TranslateConst.DefaultGroup);
          }
          return ignore;
        } else {
          this.ignoreMap.set(element, true);
          return true;
        }
      }
    }
    return true;
  }

  private findGroup(element: HTMLElement): string {
    while (element && element != document.documentElement) {
      let group = element.getAttribute(TranslateConst.TranslateGroup);
      if (group) {
        return group;
      }
      element = this.getParent(element);
    }
    return undefined;
  }

  private getParent(element: Node): HTMLElement {
    if (element) {
      if (element.parentElement != undefined) {
        return element.parentElement;
      }
      if (element.parentNode != undefined) {
        return element.parentNode as HTMLElement;
      }
    }
    return undefined;
  }

  private findIndex(parent: Node, node: Node) {
    let childNodes = parent.childNodes
    for (let i = 0; i < childNodes.length; i++) {
      let item = childNodes.item(i);
      if (item == node) {
        return i;
      }
    }
    return -1;
  }

  private doTranslate(map: Map<Node, TranslateNode>, force = false) {
    this.removeEvents();
    if (force) {
      this.db.clearCache();
    }
    let t = Date.now();
    map.forEach((v, k, m) => {
      if (v.alive()) {
        v.translate();
      } else {
        v.destroy();
        m.delete(k);
      }
    });
    console.debug('translate count:', map.size, ' time:', Date.now() - t);
    this.addEvents();
  }

  @Delay(10000)
  private clearRemoveNode() {
    this.doClearRemoveNode();
  }

  private doClearRemoveNode = () => {
    let ignoreSize = this.ignoreMap.size;
    this.ignoreMap.forEach((v, k, m) => {
      if (!k.isConnected) {
        m.delete(k);
      }
    });

    let translateSize = this.translateGroupMap.size;
    this.translateGroupMap.forEach((v, k, m) => {
      if (!k.isConnected) {
        m.delete(k);
      }
    });
    console.debug('translate clear ignore size '
      , ignoreSize, '>', this.ignoreMap.size
      , ' translate size '
      , translateSize, '>', this.translateGroupMap.size
    );
  }

  private clear() {
    this.nodeMap.forEach(node => {
      node.destroy();
    });
    this.nodeMap.clear();
    this.ignoreMap.clear();
    this.translateGroupMap.clear();
  }
}
