import { TranslateNodes } from './translate-nodes';
import { TranslateConst } from '../config/translate-config';

export class TranslateSubmits extends TranslateNodes {
    need(node: HTMLInputElement): boolean {
        return node.tagName == 'INPUT' && node.type && node.type.toLowerCase() == 'submit' && (node.value != undefined || node.getAttribute(TranslateConst.Translatekey) != undefined);
    }
    getText(node): string {
        return node.value;
    }
    setText(node, text: string) {
        if (text) {
            node.value = text;
        }
    }
    findKeyText(node: HTMLInputElement) {
        return {
            key: node.getAttribute(TranslateConst.Translatekey),
            text: node.value
        };
    }
}
