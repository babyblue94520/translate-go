import { TranslateNodes } from './translate-nodes';
export declare class PlaceholderTranslateNodes extends TranslateNodes {
    need(node: any): boolean;
    getText(node: any): string;
    setText(node: any, text: string): void;
}
