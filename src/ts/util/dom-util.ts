
interface DefaultConfig {
    text: string;
    className?: string;
}

interface ButtonConfig extends DefaultConfig {
    onclick: any;
}

export class DomUtil {
    /**
     * 產生按鈕
     * @param config
     * @param level 檢查或不檢查權限等級
     */
    public static buildButton(config: ButtonConfig, level?: number): HTMLButtonElement {
        let button = DomUtil.create('button');
        button.className = 'ttb-button ' + config.className || '';
        button.addEventListener('click', config.onclick);
        button.innerText = config.text;
        return button as HTMLButtonElement;
    }

    public static buildLinkButton(config: ButtonConfig): HTMLSpanElement {
        let span = DomUtil.create('span');
        span.className = 'ttb-link-button ' + config.className || '';
        span.addEventListener('click', config.onclick);
        span.innerText = config.text;
        return span as HTMLSpanElement;
    }

    public static buildSpan(config: DefaultConfig): HTMLSpanElement {
        let span = DomUtil.create('span');
        span.className = config.className || '';
        span.innerText = config.text;
        return span as HTMLSpanElement;
    }

    public static buildDiv(config: DefaultConfig): HTMLDivElement {
        let div = DomUtil.create('div');
        div.className = config.className || '';
        div.innerText = config.text;
        return div as HTMLDivElement;
    }
    public static create(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    /**
     * 設定瀏覽器相容的css 屬性
     * @param element
     * @param key
     * @param value
     */
    public static style(element: HTMLElement, key: string, value: string) {
        if (element && key) {
            element.style[key] = value;
            key = key[0].toUpperCase() + key.substring(1);
            element.style['webkit' + key] = value;
            element.style['moz' + key] = value;
            element.style['ms' + key] = value;
            element.style['o' + key] = value;
        }
    }

    public static remove(element: HTMLElement) {
        if (element) {
            if (element.remove) {
                element.remove();
            } else if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
        }
    }

    /**
     * 是否為純Object
     * @param {?} value
     * @return {Boolean}
     */
    public static isObject(value) {
        if (value === null || value === undefined) {
            return false;
        }
        return (value.constructor === Object);
    }

    /**
     * 是否為空物件
     * @param {?} value
     * @return {Boolean}
     */
    public static isEmptyObject(value) {
        if (!DomUtil.isObject(value)) {
            return true;
        }
        if ('{}' == JSON.stringify(value)) {
            return true;
        } else {
            return false;
        }
    }
}
