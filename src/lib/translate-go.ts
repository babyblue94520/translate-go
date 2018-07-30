import { ITranslateNode, TranslateType } from './translate.interface';
import { PlaceholderTranslateNodes } from './nodes/translate-placeholder-nodes';
import { TextTranslateNodes } from './nodes/translate-text-nodes';
import { TranslateDB } from './translate-db';
import { TranslateNodes } from './nodes/translate-nodes';
import { TranslateToolBar } from './translate-toolbar';


/**
 * 翻譯
 */
export class TranslateGO {
    private isWatch = false;
    private db: TranslateDB;
    // 當前語系
    private currentLanguage;
    // 需要被翻譯的Node
    private translateTextNodes = new TextTranslateNodes();
    private translatePlaceholderNodes = new PlaceholderTranslateNodes();
    // 忽略標籤
    private ignoreTagArray = ['SCRIPT', 'LINK', 'META', 'STYLE'];
    // 忽略Attribute
    private ignoreAttributeName = 'notTranslate';
    // Key Attribute
    private keyAttributeName = 'translateKey';

    private windowAlert = window.alert;
    private windowConfirm = window.confirm;
    private toolbar: TranslateToolBar;

    constructor(defaultLanguage: string, dev?: boolean) {
        this.currentLanguage = defaultLanguage || navigator.language;
        this.db = new TranslateDB(dev);
        if (dev) {
            this.toolbar = new TranslateToolBar(this);
            this.toolbar.updateLanaguageOption(this.db.getLanguages());
            this.toolbar.changeLanaguage(this.currentLanguage);
        }
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
     * 載入文字多語資料
     * @param data
     */
    public loadLanguageData(data: any) {
        this.db.insert(data);
        if (this.toolbar) {
            this.toolbar.updateLanaguageOption(this.db.getLanguages());
            this.toolbar.changeLanaguage(this.currentLanguage);
        }
        if (this.isWatch) {
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
        if (typeof text === 'string') {
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
            let t = getNow();
            console.log('doTranslate start');
            this.currentLanguage = language;
            this.doTranslate();
            console.log('doTranslate end', (getNow() - t) + 'ms');
            if (this.toolbar) {
                this.toolbar.changeLanaguage(this.currentLanguage);
            }
        }
    }

    /**
     * 觀察並翻譯
     */
    public watch() {
        this.stop();
        // this.translateTextNodes = new TextTranslateNodes();
        // this.translatePlaceholderNodes = new PlaceholderTranslateNodes();
        this.isWatch = true;
        console.log('find text node start');
        let t = getNow();
        this.loadTextNodes();
        console.log('find text node end', (getNow() - t) + 'ms');
        t = getNow();
        this.doTranslate();
        console.log('doTranslate end', (getNow() - t) + 'ms');

        window.alert = this.proxyAlertHanlder;
        window.confirm = this.proxyConfirmHanlder;
        document.addEventListener('DOMNodeInserted', this.domNodeInserted);
        document.addEventListener('DOMSubtreeModified', this.domSubtreeModified);
        document.addEventListener('DOMNodeInsertedIntoDocument', this.domNodeInserted);
        if (this.toolbar) {
            this.toolbar.status(true);
        }
    }

    /**
     * 停止觀察和翻譯
     */
    public stop() {
        this.isWatch = false;
        window.alert = this.windowAlert;
        window.confirm = this.windowConfirm;
        document.removeEventListener('DOMNodeInserted', this.domNodeInserted);
        document.removeEventListener('DOMSubtreeModified', this.domSubtreeModified);
        document.removeEventListener('DOMNodeInsertedIntoDocument', this.domNodeInserted);
        if (this.toolbar) {
            this.toolbar.status(false);
        }
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
    private isNonIgnore(element: Element): boolean {
        if (element.nodeType == 3) {
            element = element.parentElement;
        }
        if (element.nodeType == 1) {
            if (this.ignoreTagArray.indexOf(element.tagName) == -1) {
                return element.getAttribute(this.ignoreAttributeName) == null;
            } else {
                return false;
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
            } else {
                let key = node.getAttribute(this.keyAttributeName);
                if (key) {
                    if (!node.innerText.trim()) {
                        node.innerText = key;
                    }
                }
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
    private addNode(translateNodes: TranslateNodes, node: ITranslateNode): void {
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
    private modifyAddNode(translateNodes: TranslateNodes, node: ITranslateNode): void {
        if (!this.updateNode(translateNodes, node)) {
            if (this.isCanAddNode(node) && this.addTranslateSource(translateNodes, node)) {
                this.doTranslateNodesSetText(translateNodes, node);
                translateNodes.add(node);
            }
        }
    }

    /**
     * 檢查是否需要翻譯
     * @param node
     */
    private isCanAddNode(node: any) {
        let parent = node;
        while ((parent = parent.parentElement) != document.documentElement) {
            if (parent.getAttribute(this.ignoreAttributeName) != null) {
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
    private updateNode(translateNodes: TranslateNodes, node: ITranslateNode): boolean {
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
    private addTranslateSource(translateNodes: TranslateNodes, node: ITranslateNode) {
        let key = node.parentElement.getAttribute(this.keyAttributeName);
        if (key) {
            return (node.translateTextSource = this.db.getTranslateSourceByKey(key));
        } else {
            let text = translateNodes.getText(node);
            if (text == undefined || String(text).length == 0) { return false; }
            return (node.translateTextSource = this.db.getTranslateSource(text));
        }
    }

    /**
     * 翻譯
     */
    private doTranslateNodesSetText(translateNodes: TranslateNodes, node: ITranslateNode): void {
        translateNodes.setText(node,
            this.db.translateBySource(
                translateNodes.getText(node),
                node.translateTextSource,
                this.currentLanguage
            )
        );
    }
}


function getNow(): number {
    return new Date().getTime();
}
