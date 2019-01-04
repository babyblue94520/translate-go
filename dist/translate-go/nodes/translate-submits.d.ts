import { TranslateNodes } from './translate-nodes';
export declare class TranslateSubmits extends TranslateNodes {
    need(node: HTMLInputElement): boolean;
    getText(node: any): string;
    setText(node: any, text: string): void;
    findKeyText(node: HTMLInputElement): {
        key: string;
        text: string;
    };
}
