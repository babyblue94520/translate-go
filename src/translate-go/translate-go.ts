import { PlaceholderTranslateNodes } from './nodes/translate-placeholder-nodes';
import { TextTranslateNodes } from './nodes/translate-text-nodes';
import { TranslateConfig, TranslateConst } from './config/translate-config';
import { TranslateDB } from './translate-db';
import { TranslateKeySource, TranslateNode } from './translate.interface';
import { TranslateNodes } from './nodes/translate-nodes';
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
    private db: TranslateDB = new TranslateDB();
    // 當前語系
    private currentLanguage = TranslateConfig.defaultLanguage || navigator.language;
    // 需要被翻譯的Node
    private translateTextNodes = new TextTranslateNodes();
    private translatePlaceholderNodes = new PlaceholderTranslateNodes();

    private windowAlert = window.alert;
    private windowConfirm = window.confirm;
    private elementSetAttributeOrigin = Element.prototype.setAttribute;

    constructor() {
    }

    /**
     * 是否監控中
     */
    public isWatch(): boolean {
        return this.watch;
    }

    public getTranslateNode(): TranslateNodes {
        return this.translateTextNodes;
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
        if (this.watch) {
            this.loadTextNodes();
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
            this.doTranslate();
        }
    }

    /**
     * 觀察並翻譯
     */
    public start() {
        this.stop();
        this.watch = true;
        this.reload();
        this.doTranslate();

        window.alert = this.proxyAlertHanlder;
        window.confirm = this.proxyConfirmHanlder;
        Element.prototype.setAttribute = this.buildProxySetAttribute(this);
        document.addEventListener('DOMNodeInserted', this.domNodeInserted);
        document.addEventListener('DOMSubtreeModified', this.domSubtreeModified);
        document.addEventListener('DOMNodeInsertedIntoDocument', this.domNodeInserted);
    }

    /**
     * 停止觀察和翻譯
     */
    public stop() {
        this.watch = false;
        window.alert = this.windowAlert;
        window.confirm = this.windowConfirm;
        Element.prototype.setAttribute = this.elementSetAttributeOrigin;
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
            if (key == TranslateConst.Translatekey) {
                this.innerText = value;
            } else if (key == TranslateConst.PlaceholderTranslatekey) {
                go.addNode(go.translatePlaceholderNodes, this);
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
        if (this.translateTextNodes.need(node) && this.isNonIgnore(node)) {
            this.modifyAddNode(this.translateTextNodes, node);
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
        if (this.isNonIgnore(node)) {
            if (this.translateTextNodes.need(node)) {
                this.addNode(this.translateTextNodes, node);
            } else if (this.translatePlaceholderNodes.need(node)) {
                this.addNode(this.translatePlaceholderNodes, node);
            }
            this.loopNodes(node.childNodes);
        }
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
    private loadTextNodes(): void {
        if (document.head) {
            this.nodeHandler(document.head);
        }
        if (document.body) {
            this.nodeHandler(document.body);
        }
    }

    /**
     * 執行翻譯
     */
    private doTranslate(): void {
        // 翻譯 text
        this.translateTextNodes.clean();
        let nodes = this.translateTextNodes.getNodes();
        for (let i = 0, l = nodes.length; i < l; i++) {
            this.doTranslateNodesSetText(this.translateTextNodes, nodes[i]);
        }
        // 翻譯placeholder
        this.translatePlaceholderNodes.clean();
        nodes = this.translatePlaceholderNodes.getNodes();
        for (let i = 0, l = nodes.length; i < l; i++) {
            this.doTranslateNodesSetText(this.translatePlaceholderNodes, nodes[i]);
        }
    }

    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    private addNode(translateNodes: TranslateNodes, node: TranslateNode): void {
        if (!this.updateNode(translateNodes, node)) {
            if (this.addTranslateSource(translateNodes, node)) {
                this.doTranslateNodesSetText(translateNodes, node);
                translateNodes.add(node);
            }
        }
    }


    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    private modifyAddNode(translateNodes: TranslateNodes, node: TranslateNode): void {
        if (!this.updateNode(translateNodes, node)) {
            if (this.isCanAddNode(node) && this.addTranslateSource(translateNodes, node)) {
                this.doTranslateNodesSetText(translateNodes, node);
                translateNodes.add(node);
            } else {
                translateNodes.remove(node);
            }
        }
    }

    /**
     * 檢查是否需要翻譯
     * @param node
     */
    private isCanAddNode(node: any) {
        let parent = node;
        while ((parent = TranslateUtil.getParentElement(parent)) != document.documentElement) {
            if (parent.getAttribute(TranslateConst.IgnoreAttributeName) != null) {
                return false;
            }
        }
        return true;
    }

    /**
     * 更新翻譯
     * @param translateNodes
     * @param node
     */
    private updateNode(translateNodes: TranslateNodes, node: TranslateNode): boolean {
        // 檢查當前文字跟當前應該翻譯文字是否相同
        if (node.translateTextSource) {
            if (node.translateTextSource.currentText == translateNodes.getText(node)) {
                return true;
            }
            // 更新翻譯檔
            if (this.addTranslateSource(translateNodes, node)) {
                this.doTranslateNodesSetText(translateNodes, node);
                return true;
            }
        }
        return false;
    }

    /**
     * 為node新增翻譯檔
     * @param node
     */
    private addTranslateSource(translateNodes: TranslateNodes, node: TranslateNode) {
        let key, text;
        if (node.nodeType == 3) {
            key = TranslateUtil.getParentElement(node).getAttribute(TranslateConst.Translatekey);
            text = node.data;
        } else {
            key = (<any>node).getAttribute(TranslateConst.Translatekey);
            if (key != undefined && key != '') {
                text = (<any>node).innerText;
                if (text == undefined || text == '') {
                    text = (<any>node).innerText = key;
                }
                key = undefined;
            } else {
                key = (<any>node).getAttribute(TranslateConst.PlaceholderTranslatekey);
                if (key != undefined) {
                    text = (<any>node).getAttribute(TranslateConst.Placeholder);
                    if (text == undefined || text == '') {
                        text = key;
                        (<any>node).setAttribute(TranslateConst.Placeholder, key);
                    }
                }
            }
        }
        if (key != undefined) {
            return (node.translateTextSource = this.db.getTranslateSourceAndLogByKey(key, text));
        } else {
            text = translateNodes.getText(node);
            if (text == undefined || String(text).length == 0) { return false; }
            if (/^[a-zA-Z0-9_]+$/.test(text)) {
                node.translateTextSource = this.db.getTranslateSourceByKey(text);
                if (node.translateTextSource) {
                    return node.translateTextSource;
                }
            }
            return (node.translateTextSource = this.db.getTranslateSource(text));
        }
    }

    /**
     * 翻譯
     */
    private doTranslateNodesSetText(translateNodes: TranslateNodes, node: TranslateNode): void {
        let newText = this.db.translateBySource(
            translateNodes.getText(node),
            node.translateTextSource,
            this.currentLanguage
        );
        translateNodes.setText(node, newText);
    }
}
