import { TranslateNodes } from './translate-nodes';
import { TranslateUtil } from '../translate-util';
import { TranslateConst } from '../config/translate-config';

export class TranslateTexts extends TranslateNodes {
    need(node: any): boolean {
        return node.nodeType == 3;
    }
    getText(node): string {
        return node.data;
    }
    setText(node, text: string) {
        if (text) {
            node.data = text;
        }
    }
    findKeyText(node: Text) {
        return {
            key: TranslateUtil.getParentElement(node).getAttribute(TranslateConst.Translatekey),
            text: node.data
        };
    }
}
