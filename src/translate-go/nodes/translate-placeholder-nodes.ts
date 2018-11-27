import { TranslateNodes } from './translate-nodes';

export class PlaceholderTranslateNodes extends TranslateNodes {
    need(node: any): boolean {
        return node.placeholder != undefined || node.placeholder != '';
    }
    getText(node): string {
        return node.placeholder;
    }
    setText(node, text: string) {
        if (text) {
            node.placeholder = text;
        }
    }
}