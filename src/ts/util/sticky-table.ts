import { toDelayFn } from "ts/lib/cui/core/decorators/delay";

export interface StickyOptions {
  refreshDelay?: number;
  zIndex?: number;
  head?: OptionsDetail;
  body?: OptionsDetail;
  foot?: OptionsDetail;
}

export interface OptionsDetail {
  rows?: number;
  cols?: number;
}

interface StickyPosition {
  zIndex: number;
  top?: number;
  left?: number;
  bottom?: number;
}

let stickyCount = 0;

export class StickyTable {
  private name: string;
  private style: HTMLStyleElement;
  private top = 0;
  private content = '';

  constructor(private table: HTMLTableElement, private options: StickyOptions) {
    this.style = document.createElement('style');
    document.head.appendChild(this.style);

    this.name = `sticky-table-${stickyCount++}`;
    this.table.classList.add(this.name);
    this.options = { zIndex: 3, refreshDelay: 100, ...this.options };
    this.refresh = toDelayFn(this.refresh, this.options.refreshDelay);
    this.refresh();
    this.addEvents();
  }

  public destroy() {
    this.removeEvents();
    this.table = null;
    document.head.removeChild(this.style);
  }

  public refresh = () => {
    if (!this.table?.isConnected) return;
    this.removeEvents();
    this.top = 0;
    this.content = '';
    this.stickyHead();
    this.stickyBody();
    this.stickyFoot();
    if (this.style.innerHTML != this.content) {
      this.style.innerHTML = this.content;
    }
    this.addEvents();
  };

  private addEvents() {
    window.addEventListener('resize', this.refresh);
    window.addEventListener('mousedown', this.refresh);
  }

  private removeEvents() {
    window.removeEventListener('resize', this.refresh);
    window.removeEventListener('mousedown', this.refresh);
  }

  private stickyHead() {
    let thead = this.table.querySelector('thead');
    if (!thead?.isConnected) return;

    let detail = this.options.head;
    let zIndex = this.options.zIndex + 3;
    let name = `.${this.name} thead`;
    if (detail.rows) {
      let position = {
        zIndex: zIndex
        , top: 0
      };
      this.setRowSticky(detail.rows, thead, name, position);
      this.top = position.top;
    } else {
      this.top = thead.offsetHeight;
      this.setSticky(name, {
        zIndex: zIndex
        , top: 0
      });
    }

    this.setColumnSticky(detail.cols, thead, name, {
      zIndex: zIndex
      , top: 0
    });
  }

  private stickyBody() {
    let tbody = this.table.querySelector('tbody');
    if (!tbody?.isConnected) return;

    let detail = this.options.body;
    let zIndex = this.options.zIndex + 1;
    let name = `.${this.name} tbody`;
    this.setRowSticky(detail.rows, tbody, name, {
      zIndex: zIndex
      , top: this.top
    });

    this.setColumnSticky(detail.cols, tbody, name, {
      zIndex: zIndex
    });
  }

  private stickyFoot() {
    let tfoot = this.table.querySelector('tfoot');
    if (!tfoot?.isConnected) return;

    let detail = this.options.head;
    let zIndex = this.options.zIndex + 3;
    let name = `.${this.name} tfoot`;
    if (detail.rows) {
      let position = {
        zIndex: zIndex
        , bottom: 0
      };
      this.setRowSticky(detail.rows, tfoot, name, position);
    } else {
      this.setSticky(name, {
        zIndex: zIndex
        , bottom: 0
      });
    }

    this.setColumnSticky(detail.cols, tfoot, name, {
      zIndex: zIndex
    });
  };

  private setRowSticky(rows: number, element: HTMLElement, name: string, position: StickyPosition) {
    if (rows == undefined) return;
    position.zIndex += 1;
    let trs;
    let increment;
    if (position.bottom != undefined) {
      trs = Array.prototype.reverse.call(element.children);
      increment = (height: number) => position.bottom += height - 1;
    } else {
      trs = Array.from(element.children);
      increment = (height: number) => position.top += height - 1;
    }

    for (let i = 0; i < trs.length; i++) {
      if (i >= rows) break;
      let tr = <HTMLElement>trs[i];
      this.setSticky(name + ` tr:nth-of-type(${i + 1})`, position);
      increment(tr.offsetHeight);
    }
  }

  private setColumnSticky(cols: number, element: HTMLElement, name: string, position: StickyPosition) {
    if (cols == undefined) return;
    let tr = <HTMLElement>element.childNodes.item(0);
    if (!tr) return;
    let tds = tr.childNodes;
    position.left = 0;
    for (let i = 0; i < tds.length; i++) {
      if (i >= cols) break;
      let td = <HTMLElement>tds.item(i);
      this.setSticky(name + ` td:nth-of-type(${i + 1})`, position);
      this.setSticky(name + ` th:nth-of-type(${i + 1})`, position);
      position.left += td.offsetWidth;
    }
  }

  private setSticky(name: string, position: StickyPosition) {
    this.content += `${name} {\n`;
    this.content += ' position: sticky;\n';
    this.content += ` z-index: ${position.zIndex};\n`;
    this.content += ` left: ${position.left || 0}px;\n`;
    if (position.top != undefined) {
      this.content += ` top: ${position.top}px\n`;
    }
    if (position.bottom != undefined) {
      this.content += ` bottom: ${position.bottom}px\n`;
    }
    this.content += '}\n\n';
  }
}
