import { TranslateGO } from "./translate-go";
export declare class TranslateToolBar {
    private translateGO;
    private _element;
    private _languageSelect;
    private _startWatchButton;
    private _stopWatchButton;
    private _openToolWindowButton;
    private _postNonTextButton;
    private toolWindow;
    private toolUrl;
    private toolOrigin;
    constructor(translateGO: TranslateGO);
    private start;
    private stop;
    private languageChange;
    private openTool;
    private postNonText;
    status: (isStart: boolean) => void;
    updateLanaguageOption: (array: string[]) => void;
    changeLanaguage: (lang: string) => void;
}
