

import { clone } from '../clone';
import { Async } from '../decorators/async';

export enum OverlayClassName {
  overlay = 'ttb-overlay'
  , screen = 'ttb-overlay-screen'
  , bodyOpen = 'ttb-overlay-open'
  , open = 'open'
}

interface OverlayConfig {
  zIndex?: number;
  onOpen?: Function;
  canClose?: () => boolean;
  onClose?: Function;
}

/**
 * 用來擺放dialog
 */
export class Overlay {
  private static openCount = 0;
  private static zIndex = 0;
  private element: HTMLDivElement;
  private screenElement: HTMLDivElement;
  private show = false;
  private config: OverlayConfig;
  private timer;

  constructor(config: OverlayConfig = {}) {
    this.config = clone({
      zIndex: 100
      , onOpen: () => { }
      , onClose: () => { }
    }, config);
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
  public open() {
    if (this.show) {
      return;
    }
    if (!this.screenElement.isConnected) {
      document.body.appendChild(this.screenElement);
    }
    if (!this.element.isConnected) {
      document.body.appendChild(this.element);
    }
    this.show = true;
    Overlay.openCount++;
    clearTimeout(this.timer);
    this.timer = this.doOpen();
  }

  @Async()
  private doOpen() {
    this.screenElement.style.zIndex = String(++Overlay.zIndex + this.config.zIndex);
    this.element.style.zIndex = String(++Overlay.zIndex + this.config.zIndex);
    this.screenElement.classList.add(OverlayClassName.open);
    this.element.classList.add(OverlayClassName.open);

    this.config.onOpen();
  }

  /**
   * 關閉
   * callback 等到關閉動畫完成後呼叫
  */
  public close() {
    if (!this.show) {
      return;
    }
    this.show = false;
    if (--Overlay.openCount <= 0) {
      Overlay.openCount = 0;
      Overlay.zIndex = 0;
    }
    this.element.addEventListener('transitionend', this.doRemove);
    this.element.classList.remove(OverlayClassName.open);
    this.screenElement.classList.remove(OverlayClassName.open);
    clearTimeout(this.timer);
  }

  private doRemove = () => {
    this.element.removeEventListener('transitionend', this.doRemove);
    this.config.onClose();
    this.remove(this.element);
    this.remove(this.screenElement);
  }

  /**
   * 移除物件
  */
  public destory() {
    clearTimeout(this.timer);
    this.remove(this.element);
    this.remove(this.screenElement);
    this.element = null;
    this.screenElement = null;
  }

  private remove(element: HTMLElement) {
    if (element) {
      if (element.remove) {
        element.remove();
      } else if (element.parentElement) {
        element.parentElement.removeChild(element);
      }
    }
  }
}

