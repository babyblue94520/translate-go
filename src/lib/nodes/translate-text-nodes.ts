import { TranslateNodes } from './translate-nodes';

export class TextTranslateNodes extends TranslateNodes {
    need(node: any): boolean {
        return node.nodeType == 3;
    }
    getText(node): string {
        return node.data;
    }
    setText(node, text: string) {
        node.data = text;
    }
}
