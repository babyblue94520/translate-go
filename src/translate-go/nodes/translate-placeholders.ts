import { TranslateNodes } from './translate-nodes';
import { TranslateConst } from '../config/translate-config';

export class TranslatePlaceholders extends TranslateNodes {
    need(node: HTMLInputElement): boolean {
        return (node.placeholder != undefined && node.placeholder != '') || node.getAttribute(TranslateConst.PlaceholderTranslatekey) != undefined;
    }
    getText(node): string {
        return node.placeholder;
    }
    setText(node, text: string) {
        if (text) {
            node.placeholder = text;
        }
    }
    findKeyText(node: HTMLInputElement) {
        let key = node.getAttribute(TranslateConst.PlaceholderTranslatekey);
        let text;
        if (key != undefined) {
            text = node.getAttribute(TranslateConst.Placeholder);
            if (text == undefined || text == '') {
                text = key;
                node.setAttribute(TranslateConst.Placeholder, key);
            }
        }
        return {
            key: key,
            text: text
        };
    }
}
