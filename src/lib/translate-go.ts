import { TranslateDB } from './translate-db';
import { TextTranslateNodes } from './nodes/translate-text-nodes';
import { PlaceholderTranslateNodes } from './nodes/translate-placeholder-nodes';
import { TranslateNodes } from './nodes/translate-nodes';
import { ITranslateNode } from './translate.interface';
import { TranslateToolBar } from './translate-toolbar';


/**
 * 翻譯
 */
export class TranslateGO {
    private _db;
    // 當前語系
    private _currentLanguage;
    // 需要被翻譯的Node
    private _cacheInputElement = [];
    // 需要被翻譯的Node
    // private _translateNodesArray = [new TextTranslateNodes(), new InputTranslateNodes(), new TextAreaTranslateNodes()];
    // 需要被翻譯的Node
    private _translateTextNodes = new TextTranslateNodes();
    private _translatePlaceholderNodes = new PlaceholderTranslateNodes();
    // 忽略標籤
    private _ignoreTagArray = ['SCRIPT', 'LINK', 'META', 'STYLE', 'NO-TRANSLATE'];

    private _temp = [];

    private windowAlert = window.alert;
    private windowConfirm = window.confirm;
    private toolbar: TranslateToolBar;

    constructor(defaultLanguage: string, dev?: boolean) {
        this._currentLanguage = defaultLanguage || navigator.language;
        this._db = new TranslateDB(dev);
        if (dev) {
            this.toolbar = new TranslateToolBar(this);
            this.toolbar.updateLanaguageOption(this._db.getLanguages());
            this.toolbar.changeLanaguage(this._currentLanguage);
        }
    }

    /**
     * 延遲執行方法
     * @param name
     * @param delay ms
     * @param function
     */
    public delayAction = (() => {
        let _timers = {};
        let _startTime = {};
        return (name: string, delay: number, fn: Function) => {
            if (_timers[name]) {
                clearTimeout(_timers[name]);
            } else {
                _startTime[name] = performance.now();
            }
            _timers[name] = setTimeout(function () {
                console.log(name, 'delay time:', performance.now() - _startTime[name]);
                _startTime[name] = performance.now();
                fn();
                console.log(name, 'run time:', performance.now() - _startTime[name]);
                delete _timers[name];
                delete _startTime[name];
            }, delay);
        };
    })();

    public getTranslateNode(): TranslateNodes {
        return this._translateTextNodes;
    }

    /**
     * 取得無法翻譯的文字
     */
    public getNonTranslateText(): any {
        return this._db.getNonTranslate();
    }

    /**
     * 載入文字多語資料
     * @param data
     */
    public loadLanguageData(data: any) {
        this._db.insert(data);
        if (this.toolbar) {
            this.toolbar.updateLanaguageOption(this._db.getLanguages());
            this.toolbar.changeLanaguage(this._currentLanguage);
        }
        this.loadTextNodes();
    }

    /**
     * 取得當前語系
     */
    public getLanguage(): string {
        return this._currentLanguage;
    }

    /**
     * 取得當前語系文字
     * @param text
     */
    public getText(text: string): string {
        if (typeof text === 'string') {
            return this._db.translate(text, this._currentLanguage);
        } else {
            return text;
        }
    }

    /**
     * 取得當前語系文字
     * @param key
     */
    public getTextByKey(key: string): string {
        return this._db.translateByKey(key, this._currentLanguage);
    }

    /**
     * 依輸入語系進行翻譯
     * @param language
     */
    public translate(language: string) {
        if (this._currentLanguage == language) { return; }
        if (this._db.hasLanguage(language)) {
            let t = performance.now();
            console.log('_doTranslate start');
            this._currentLanguage = language;
            this.doTranslate();
            console.log('_doTranslate end', (performance.now() - t));
            if (this.toolbar) {
                this.toolbar.changeLanaguage(this._currentLanguage);
            }
        }
    }

    /**
     * 觀察並翻譯
     */
    public watch() {
        this.stop();
        console.log('find text node start');
        let t = performance.now();
        this.loadTextNodes();
        console.log('find text node end', (performance.now() - t));
        this.doTranslate();
        this.addListener();
        if (this.toolbar) {
            this.toolbar.status(true);
        }
    }

    /**
     * 停止觀察和翻譯
     */
    public stop() {
        window.alert = this.windowAlert;
        window.confirm = this.windowConfirm;
        document.removeEventListener('DOMNodeInserted', this.delayDOMNodeInserted);
        document.removeEventListener('DOMSubtreeModified', this.delayDOMSubtreeModified);
        document.removeEventListener('DOMNodeInsertedIntoDocument', this.delayDOMNodeInserted);

        if (this.toolbar) {
            this.toolbar.status(false);
        }
    }

    private addListener = () => {
        window.alert = this.proxyAlertHanlder;
        window.confirm = this.proxyConfirmHanlder;
        document.addEventListener('DOMNodeInserted', this.delayDOMNodeInserted);
        document.addEventListener('DOMSubtreeModified', this.delayDOMSubtreeModified);
        document.addEventListener('DOMNodeInsertedIntoDocument', this.delayDOMNodeInserted);
    }

    private proxyAlertHanlder = (text) => {
        this.windowAlert.call(window, this.getText(text));
    }

    private proxyConfirmHanlder = (text) => {
        return this.windowConfirm.call(window, this.getText(text));
    }


    /**
     * 全部文字翻譯
     * @param 事件
     */
    private delayDOMNodeInserted = (e) => {
        this.nodeHandler(e.target);
    }

    /**
     * 全部文字翻譯
     * @param 事件
     */
    private delayDOMSubtreeModified = (e) => {
        if (this._translateTextNodes.need(e.target)) {
            this.addNode.call(this, this._translateTextNodes, e.target);
        }
    }

    /**
     * 是否非忽略的標籤
     * @param element
     */
    private isNonIgnore(element: Element) {
        return this._ignoreTagArray.indexOf(element.tagName) == -1;
    }

    /**
     * Node 處理
     * @param node
     * @param handler
     */
    private nodeHandler(node) {
        if (node && this.isNonIgnore(node) && node.isConnected) {
            if (this._translateTextNodes.need(node)) {
                this.addNode.call(this, this._translateTextNodes, node);
                return;
            } else if (this._translatePlaceholderNodes.need(node)) {
                this.addNode.call(this, this._translatePlaceholderNodes, node);
                return;
            }
            this.loopNodes(node.childNodes);
        }
    }

    /**
     * NodeList 處理
     * @param nodes 不重複寫loop
     * @param handler
     */
    private loopNodes(nodes) {
        // console.log('nodes', nodes);
        for (let i = 0, l = nodes.length; i < l; i++) {
            // console.log(i, nodes[i]);
            this.nodeHandler(nodes[i]);
        }
    }

    /**
     * 載入需要翻譯的Node
     */
    private loadTextNodes() {
        this.loopNodes(document.querySelectorAll('*'));
    }

    /**
     * 執行翻譯
     */
    private doTranslate() {
        this._translateTextNodes.clean();
        let nodes = this._translateTextNodes.getNodes();
        for (let i = 0, l = nodes.length; i < l; i++) {
            this.doTranslateNodesSetText(this._translateTextNodes, nodes[i]);
        }
    }

    /**
     *
     * @param translateNodes
     */
    private doTranslateNodesSetText(translateNodes: TranslateNodes, node: ITranslateNode) {
        translateNodes.setText(node,
            this._db.translateBySource(
                translateNodes.getText(node),
                node.translateTextSource,
                this._currentLanguage
            )
        );
    }

    /**
     * 紀錄需要翻譯的node
     * @param node
     */
    private addNode(translateNodes: TranslateNodes, node: ITranslateNode) {
        if (node.translateTextSource) {
            let text = translateNodes.getText(node);
            if (node.translateTextSource.currentText != translateNodes.getText(node)) {
                this.addTranslateSource(translateNodes, node);
                this.doTranslateNodesSetText(translateNodes, node);
            }
        } else {
            if (this.addTranslateSource(translateNodes, node)) {
                translateNodes.add(node);
                this.doTranslateNodesSetText(translateNodes, node);
            }
        }
    }

    /**
     *
     * @param node
     */
    private addTranslateSource(translateNodes: TranslateNodes, node: ITranslateNode) {
        let text = translateNodes.getText(node);
        if (text == undefined || String(text).length == 0) { return false; }
        return (node.translateTextSource = this._db.getTranslateSource(text));
    }
}
