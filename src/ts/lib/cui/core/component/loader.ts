/**
 * Loader物件
 * by clare
 */
export class Loader {
    private static readonly defText = '處理中';
    private static readonly loadHtml: string = [
        ' <div class="cui-loader-block">',
        '   <div class="cui-loading"></div>',
        '   <div class="text"></div>',
        ' </div>'].join('');
    private element: HTMLElement;
    private textElement: Element;
    private openCount = 0;
    private defauleZIndex = '999';
    private openTimer;

    constructor() {
        this.element = this.create();
        this.textElement = this.element.querySelector('.text');
    }

    /**
     * 回傳物件
     */
    public getElement = () => {
        return this.element;
    }

    public message = (msg?: string) => {
        if (msg) {
            this.textElement.innerHTML = msg;
        } else {
            this.textElement.innerHTML = Loader.defText;
        }
    }

    /**
     * 延遲開啟繞圈圈動畫，如果等待時間太短就不用出現
     * @param {string} msg 顯示訊息
     * @param {any} zIndex css z-index
     */
    public open = (msg?: string, zIndex?: any) => {
        this.openCount++;
        clearTimeout(this.openTimer);
        this.openTimer = setTimeout(this.doOpen.bind(this, msg, zIndex), 300);
    }

    public openNotDelay = (msg?: string, zIndex?: any) => {
        this.openCount++;
        this.doOpen(msg, zIndex);
    }

    /**
     * 開啟繞圈圈動畫
     * @param {string} msg 顯示訊息
     * @param {any} zIndex css z-index
     */
    private doOpen = (msg?: string, zIndex?: any) => {
        if (this.openCount > 0) {
            if (zIndex) {
                this.element.style.zIndex = zIndex;
            } else {
                this.element.style.zIndex = this.defauleZIndex;
            }
            if (msg) {
                this.textElement.innerHTML = msg;
            } else {
                this.textElement.innerHTML = Loader.defText;
            }
            this.element.classList.add('show');
            this.addParentClass();
        }
    }

    /**
     * 關閉繞圈圈
     */
    public close = () => {
        if (--this.openCount > 0) { return; }
        clearTimeout(this.openTimer);
        this.openCount = 0;
        this.element.style.zIndex = '';
        this.element.classList.remove('show');
        this.removeParentClass();
    }

    /**
     * 絕對關閉繞圈圈
     */
    public closeAll = () => {
        this.openCount = 0;
        this.element.style.zIndex = '';
        this.element.classList.remove('show');
        this.removeParentClass();
    }

    /**
     * 產生繞圈圈物件
     */
    private create = () => {
        let element = document.createElement('div');
        element.className = 'cui-loader';
        element.innerHTML = Loader.loadHtml;
        return element;
    }

    private addParentClass() {
        if (this.element && this.element.parentElement) {
            this.element.parentElement.classList.add('cui-loader-hidden');
        }
    }
    private removeParentClass() {
        if (this.element && this.element.parentElement) {
            this.element.parentElement.classList.remove('cui-loader-hidden');
        }
    }
}
