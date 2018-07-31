import { TranslateNodes } from './translate-nodes';
export declare class TextTranslateNodes extends TranslateNodes {
    need(node: any): boolean;
    getText(node: any): string;
    setText(node: any, text: string): void;
}
