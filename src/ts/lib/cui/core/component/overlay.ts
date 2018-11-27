import { CUI } from '../cui';

export enum OverlayClassName {
    overlay = 'ttb-overlay',
    screen = 'ttb-overlay-screen',
    bodyOpen = 'ttb-overlay-open',
    open = 'open',
}

let overlayZIndexMax = 0;
let overlayOpenCount = 0;

/**
 * 用來擺放dialog
 */
export class Overlay {
    private element: HTMLDivElement;
    private screenElement: HTMLDivElement;
    private min = 9999;

    constructor() {
        this.element = document.createElement('div');
        this.element.className = OverlayClassName.overlay;
        this.screenElement = document.createElement('div');
        this.screenElement.className = OverlayClassName.screen;
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    /**
     * 順序很重要
     * 開啟
    */
    public open(render: Function) {
        overlayOpenCount++;
        this.screenElement.style.zIndex = String(++overlayZIndexMax + this.min);
        document.body.appendChild(this.screenElement);
        this.element.style.zIndex = String(++overlayZIndexMax + this.min);
        document.body.appendChild(this.element);

        if (render instanceof Function) {
            render();
        }

        document.body.classList.add(OverlayClassName.bodyOpen);
        document.documentElement.classList.add(OverlayClassName.bodyOpen);
        this.element.classList.add(OverlayClassName.open);
        this.screenElement.classList.add(OverlayClassName.open);
    }

    /**
     * 關閉
     * callback 等到關閉動畫完成後呼叫
    */
    public close(callback?: Function) {
        overlayOpenCount--;
        if (overlayOpenCount <= 0) {
            document.body.classList.remove(OverlayClassName.bodyOpen);
            document.documentElement.classList.remove(OverlayClassName.bodyOpen);
            overlayOpenCount = 0;
            overlayZIndexMax = 0;
        }
        this.element.classList.remove(OverlayClassName.open);
        this.screenElement.classList.remove(OverlayClassName.open);
        if (callback instanceof Function) {
            setTimeout(() => {
                callback();
                this.element.classList.remove(OverlayClassName.open);
                this.screenElement.classList.remove(OverlayClassName.open);
                CUI.remove(this.element);
                CUI.remove(this.screenElement);
            }, 337);
        }
    }

    /**
     * 移除物件
    */
    public destory() {
        if (this.element) {
            CUI.remove(this.element);
            CUI.remove(this.screenElement);
            this.element = undefined;
            this.screenElement = undefined;
        }
    }
}

