import { Debounce } from "ts/decorators/debounce";
import { DomUtil } from "ts/util/dom-util";

export enum OverlayClassName {
    overlay = 'ttb-overlay'
    , screen = 'ttb-overlay-screen'
    , bodyOpen = 'ttb-overlay-open'
    , open = 'open'
    , top = 'top'
}

let overlayZIndexMax = 0;
let overlayOpenCount = 0;

/**
 * 用來擺放dialog
 */
export class Overlay {
    private element: HTMLDivElement;
    private screenElement: HTMLDivElement;
    private isOpen = false;
    private zIndex;

    constructor(zIndex: number = 100) {
        this.zIndex = zIndex
        this.element = document.createElement('div');
        this.element.className = OverlayClassName.overlay;
        this.screenElement = document.createElement('div');
        this.screenElement.className = OverlayClassName.screen;
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    public append() {
        document.body.appendChild(this.screenElement);
        document.body.appendChild(this.element);
    }

    /**
     * 順序很重要
     * 開啟
    */
    public open(render: Function) {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        overlayOpenCount++;
        this.screenElement.style.zIndex = String(++overlayZIndexMax + this.zIndex);
        if (!this.screenElement.isConnected) {
            document.body.appendChild(this.screenElement);
        }
        this.element.style.zIndex = String(++overlayZIndexMax + this.zIndex);
        if (!this.element.isConnected) {
            document.body.appendChild(this.element);
        }
        this.screenElement.classList.add(OverlayClassName.open);
        this.element.classList.add(OverlayClassName.open);

        if (render instanceof Function) {
            render();
        }

        // document.body.classList.add(OverlayClassName.bodyOpen);
        // document.documentElement.classList.add(OverlayClassName.bodyOpen);
    }

    public top() {
        this.element.classList.add(OverlayClassName.top);
    }

    public center() {
        this.element.classList.remove(OverlayClassName.top);
    }

    /**
     * 關閉
     * callback 等到關閉動畫完成後呼叫
    */
    public close(callback?: Function) {
        if (!this.isOpen) {
            return;
        }
        this.isOpen = false;
        if (--overlayOpenCount <= 0) {
            // document.body.classList.remove(OverlayClassName.bodyOpen);
            // document.documentElement.classList.remove(OverlayClassName.bodyOpen);
            overlayOpenCount = 0;
            overlayZIndexMax = 0;
        }
        this.element.classList.remove(OverlayClassName.open);
        this.screenElement.classList.remove(OverlayClassName.open);
        if (callback instanceof Function) {
            this.doRemove(callback);
        }
    }

    @Debounce(337)
    private doRemove(callback: Function) {
        callback();
        // this.element.classList.remove(OverlayClassName.open);
        // this.screenElement.classList.remove(OverlayClassName.open);
        DomUtil.remove(this.element);
        DomUtil.remove(this.screenElement);
    }

    /**
     * 移除物件
    */
    public destory() {
        this.close();
        if (this.element) {
            DomUtil.remove(this.element);
            DomUtil.remove(this.screenElement);
            this.element = null;
            this.screenElement = null;
        }
    }
}

