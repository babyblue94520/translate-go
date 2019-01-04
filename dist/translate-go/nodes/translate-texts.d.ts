import { TranslateNodes } from './translate-nodes';
export declare class TranslateTexts extends TranslateNodes {
    need(node: any): boolean;
    getText(node: any): string;
    setText(node: any, text: string): void;
    findKeyText(node: Text): {
        key: string;
        text: string;
    };
}
