import { TranslateConfig, TranslateConst } from './config/translate-config';
import { TranslateDB } from './translate-db';
import { TranslateKeySource } from './translate.interface';
import { TranslateNodes } from './nodes/translate-nodes';
import { TranslatePlaceholders } from './nodes/translate-placeholders';
import { TranslateSubmits } from './nodes/translate-submits';
import { TranslateTexts } from './nodes/translate-texts';
import { TranslateUtil } from './translate-util';

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

/**
 * 翻譯
 */
export class TranslateGO {
    private watch = false;
    private delay = 10;
    private db: TranslateDB = new TranslateDB();
    // 當前語系
    private currentLanguage = TranslateConfig.defaultLanguage || navigator.language;
    // 需要被翻譯的 Text
    private translateTexts = new TranslateTexts(this.db);
    // 需要被翻譯的 Input placeholder
    private translatePlaceholders = new TranslatePlaceholders(this.db);
    // 需要被翻譯的 Input type ="submit"
    private translateSubmits = new TranslateSubmits(this.db);

    private translateNodes: TranslateNodes[] = [this.translateTexts, this.translatePlaceholders, this.translateSubmits];

    // 保留 window.alert 原本方法
    private windowAlert = window.alert;
    // 保留 window.confirm 原本方法
    private windowConfirm = window.confirm;
    // 保留 setAttribute 原本方法
    private elementSetAttributeOrigin = Element.prototype.setAttribute;
    // 控制 loadTextNodes 只執行一次
    private notLoadTextNodes = true;
    // 控制 cleanTextNodes 只執行一次
    private notCleanTextNodes = true;
    // 控制 setInnerTexts 只執行一次
    private notSetInnerTexts = true;
    private innerTexts = [];

    /**
     * 是否監控中
     */
    public isWatch(): boolean {
        return this.watch;
    }

    public getTranslateNode(): TranslateNodes[] {
        return this.translateNodes;
    }

    /**
     * 取得無法翻譯的文字
     */
    public getNonTranslateText(): any {
        return this.db.getNonTranslate();
    }

    /**
     * 重新載入文字多語資料
     */
    public reload(data?: TranslateKeySource) {
        if (data) {
            this.db.insert(data);
        } else {
            for (let name in window) {
                if (name.indexOf(TranslateConst.GroupPrefix) != -1) {
                    this.db.insert(window[name]);
                }
            }
        }
        if (this.watch && this.notLoadTextNodes) {
            this.notLoadTextNodes = false;
            setTimeout(this.loadTextNodes, this.delay);
        }
    }

    /**
     * 取得當前語系
     */
    public getLanguage(): string {
        return this.currentLanguage;
    }

    /**
     * 取得當前語系文字
     * @param text
     */
    public getText(text: string): string {
        if (typeof text == 'string') {
            return this.db.translate(text, this.currentLanguage);
        } else {
            return text;
        }
    }

    /**
     * 取得當前語系文字
     * @param key
     */
    public getTextByKey(key: string): string {
        return this.db.translateByKey(key, this.currentLanguage);
    }

    /**
     * 依輸入語系進行翻譯
     * @param language
     */
    public translate(language: string) {
        if (this.currentLanguage == language) { return; }
        if (this.db.hasLanguage(language)) {
            this.currentLanguage = language;
        }
        this.doTranslate();
    }

    /**
     * 觀察並翻譯
     */
    public start() {
        this.stop();
        this.watch = true;
        this.reload();
        window.alert = this.proxyAlertHanlder;
        window.confirm = this.proxyConfirmHanlder;
        Element.prototype.setAttribute = this.buildProxySetAttribute(this);
        this.addEvents();
    }

    /**
     * 停止觀察和翻譯
     */
    public stop() {
        this.watch = false;
        window.alert = this.windowAlert;
        window.confirm = this.windowConfirm;
        Element.prototype.setAttribute = this.elementSetAttributeOrigin;
        this.removeEvents();
    }

    /**
     * 監聽 Element 新增跟異動事件
     */
    private addEvents() {
        document.addEventListener('DOMNodeInserted', this.domNodeInserted);
        document.addEventListener('DOMSubtreeModified', this.domSubtreeModified);
        document.addEventListener('DOMNodeInsertedIntoDocument', this.domNodeInserted);
    }

    /**
     * 移除 Element 新增跟異動事件
     */
    private removeEvents() {
        document.removeEventListener('DOMNodeInserted', this.domNodeInserted);
        document.removeEventListener('DOMSubtreeModified', this.domSubtreeModified);
        document.removeEventListener('DOMNodeInsertedIntoDocument', this.domNodeInserted);
    }

    /**
     * 攔截alert訊息並翻譯
     */
    private proxyAlertHanlder = (text) => {
        this.windowAlert.call(window, this.getText(text));
    }

    /**
     * 攔截confirm訊息並翻譯
     */
    private proxyConfirmHanlder = (text) => {
        return this.windowConfirm.call(window, this.getText(text));
    }


    /**
     * 攔截setAttribute
     * @param go
     */
    private buildProxySetAttribute(go: TranslateGO) {
        return function (key: string, value: string) {
            go.elementSetAttributeOrigin.apply(this, arguments);
            key = key.toLowerCase();
            switch (key) {
                case TranslateConst.Translatekey:
                    if (this instanceof HTMLInputElement) {
                        if (go.translateSubmits.need(this)) {
                            go.translateSubmits.add(this);
                        }
                    } else {
                        go.innerTexts.push({
                            element: this,
                            key: value
                        });
                        if (go.notSetInnerTexts) {
                            go.notSetInnerTexts = false;
                            setTimeout(go.setInnerTexts, go.delay);
                        }
                    }
                    break;
                case TranslateConst.PlaceholderTranslatekey:
                    go.translatePlaceholders.add(this);
                    break;
                case TranslateConst.Value:
                case TranslateConst.Type:
                    if (go.translateSubmits.need(this)) {
                        go.translateSubmits.add(this);
                    }
                    break;
            }
        };
    }

    /**
     * dom新增node時，找出可翻譯node
     * @param 事件
     */
    private domNodeInserted = (e) => {
        this.nodeHandler(e.target);
    }

    /**
     * dom 有異動的時候檢查node文字是否更新
     * @param 事件
     */
    private domSubtreeModified = (e) => {
        let node = e.target;
        if (this.translateTexts.need(node)) {
            if (this.isNonIgnore(node)) {
                this.translateTexts.add(node);
            }
        } else if (this.notCleanTextNodes) {
            this.notCleanTextNodes = false;
            setTimeout(this.cleanTextNodes, this.delay);
        }
    }

    /**
     * 是否非忽略的標籤
     * @param element
     */
    private isNonIgnore(element: HTMLElement): boolean {
        if (element) {
            if (element == document.documentElement) {
                return true;
            }
            if (element.nodeType == 3) {
                element = TranslateUtil.getParentElement(element);
            }
            if (element.nodeType == 1) {
                if (TranslateConst.IgnoreTagArray.indexOf(element.tagName) == -1) {
                    if (element.getAttribute(TranslateConst.IgnoreAttributeName) == null) {
                        return this.isNonIgnore(TranslateUtil.getParentElement(element));
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    /**
     * Node 處理
     * @param node
     * @param handler
     */
    private nodeHandler(node): void {
        if (!this.isNonIgnore(node)) { return; }
        if (this.translateTexts.need(node)) {
            this.translateTexts.add(node);
        } else {
            if (this.translatePlaceholders.need(node)) {
                this.translatePlaceholders.add(node);
            } else if (this.translateSubmits.need(node)) {
                this.translateSubmits.add(node);
            } else {
                let key = node.getAttribute(TranslateConst.Translatekey);
                if (key != undefined) {
                    if (node.innerText == '') {
                        this.innerTexts.push({
                            element: node,
                            key: key
                        });
                        if (this.notSetInnerTexts) {
                            this.notSetInnerTexts = false;
                            setTimeout(this.setInnerTexts, this.delay);
                        }
                    }
                }
            }
        }
        this.loopNodes(node.childNodes);
    }

    /**
     * NodeList 處理
     * @param nodes 不重複寫loop
     * @param handler
     */
    private loopNodes(nodes): void {
        if (nodes.length == 0) {
            return;
        }
        for (let i = 0, l = nodes.length; i < l; i++) {
            this.nodeHandler(nodes[i]);
        }
    }

    /**
     * 載入需要翻譯的Node
     */
    private loadTextNodes = (): void => {
        this.notLoadTextNodes = true;
        if (document.head) {
            this.nodeHandler(document.head);
        }
        if (document.body) {
            this.nodeHandler(document.body);
        }
        this.doTranslate();
    }

    /**
     * 清除已經不在畫面上翻譯物件
     */
    private cleanTextNodes = (): void => {
        this.notCleanTextNodes = true;
        this.translateTexts.clean();
        this.translatePlaceholders.clean();
        this.translateSubmits.clean();
    }

    /**
     * 執行翻譯
     */
    private doTranslate(): void {
        document.removeEventListener('DOMSubtreeModified', this.domSubtreeModified);
        // 翻譯
        this.translateTexts.doTranslate(this.currentLanguage);
        this.translatePlaceholders.doTranslate(this.currentLanguage);
        this.translateSubmits.doTranslate(this.currentLanguage);
        document.addEventListener('DOMSubtreeModified', this.domSubtreeModified);
    }

    /**
     * 對有TranslateKey的element 新增 text
     */
    private setInnerTexts = () => {
        this.removeEvents();
        this.notSetInnerTexts = true;
        let element, key;
        for (let i = 0, l = this.innerTexts.length; i < l; i++) {
            element = this.innerTexts[i].element;
            key = this.innerTexts[i].key;
            if (element.innerText == '') {
                element.appendChild(this.translateTexts.buildText(key, ''));
            }
        }
        this.innerTexts.length = 0;
        this.addEvents();
    }
}
