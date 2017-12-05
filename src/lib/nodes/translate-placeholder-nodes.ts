import { TranslateNodes } from './translate-nodes';

export class PlaceholderTranslateNodes extends TranslateNodes {
    need(node: any): boolean {
        return (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA') && node.placeholder;
    }
    getText(node): string {
        return node.placeholder;
    }
    setText(node, text: string) {
        node.placeholder = text;
    }
}
