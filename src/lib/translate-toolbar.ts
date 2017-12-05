import { TranslateGO } from "./translate-go";

export class TranslateToolBar {
    private _element;
    private _languageSelect;
    private _startWatchButton;
    private _stopWatchButton;
    private _openToolWindowButton;
    private _postNonTextButton;

    private toolWindow: Window;
    private toolUrl = "https://babyblue94520.github.io/translate-go-tool/dist/#/Index";
    private toolOrigin = "https://babyblue94520.github.io";
    // private toolUrl = "http://127.0.0.1:4300/#/Index";
    // private toolOrigin = "http://127.0.0.1:4300";


    constructor(private translateGO: TranslateGO) {
        let style = document.createElement('style');
        style.innerHTML = [
            '.translate-toolbar{',
            'position: fixed;z-index: 999;bottom: 0px;left: 0;',
            '}',
            '.translate-toolbar>button,.translate-toolbar>select{',
            'padding: 10px;margin: 5px;display: inline-block; box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px, rgba(0, 0, 0, 0.22) 0px 3px 10px;',
            '}',
            '.translate-toolbar>button:disabled,.translate-toolbar>select:disabled{',
            'background-color:#fff;color:#ccc;',
            'box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px',
            '}',
        ].join('');

        document.head.appendChild(style);
        this._element = document.createElement('div');
        this._element.className = 'translate-toolbar';

        this._languageSelect = document.createElement('select');
        this._languageSelect.addEventListener('change', this.languageChange);

        this._startWatchButton = document.createElement('button');
        this._startWatchButton.innerText = 'start';
        this._startWatchButton.addEventListener('click', this.start);

        this._stopWatchButton = document.createElement('button');
        this._stopWatchButton.innerText = 'stop';
        this._stopWatchButton.addEventListener('click', this.stop);

        this._openToolWindowButton = document.createElement('button');
        this._openToolWindowButton.innerText = 'open';
        this._openToolWindowButton.addEventListener('click', this.openTool);

        this._postNonTextButton = document.createElement('button');
        this._postNonTextButton.innerText = 'post';
        this._postNonTextButton.addEventListener('click', this.postNonText);

        this._element.appendChild(this._languageSelect);
        this._element.appendChild(this._startWatchButton);
        this._element.appendChild(this._stopWatchButton);
        this._element.appendChild(this._openToolWindowButton);
        this._element.appendChild(this._postNonTextButton);
        if (document.body) {
            document.body.appendChild(this._element);
        } else {
            window.onload = (e) => {
                document.body.appendChild(this._element);
            };
        }
    }

    private start = (e) => {
        this.translateGO.watch();
        this.status(true);
    }
    private stop = (e) => {
        this.translateGO.stop();
        this.status(false);
    }

    private languageChange = (e) => {
        this.translateGO.translate(this._languageSelect.value);
    }

    private openTool = (e) => {
        if (!this.toolWindow || this.toolWindow.closed) {
            this.toolWindow = window.open(this.toolUrl, this.toolOrigin);
            setTimeout(() => {
                this.toolWindow.postMessage(this.translateGO.getNonTranslateText(), this.toolOrigin);
            }, 2000);
        } else {
            this.toolWindow.focus();
        }
    }

    private postNonText = (e) => {
        if (this.toolWindow) {
            this.toolWindow.postMessage(this.translateGO.getNonTranslateText(), this.toolOrigin);
            this.toolWindow.focus();
        }
    }

    public status = (isStart: boolean) => {
        if (isStart) {
            this._startWatchButton.disabled = true;
            this._stopWatchButton.disabled = false;
        } else {
            this._startWatchButton.disabled = false;
            this._stopWatchButton.disabled = true;
        }
    }

    public updateLanaguageOption = (array: Array<string>) => {
        if (this._languageSelect) {
            console.log(this._languageSelect.value);
            this._languageSelect.innerHTML = '';
            let option, lang;
            for (let i in array) {
                lang = array[i];
                option = document.createElement('option');
                option.value = lang;
                option.innerText = lang;
                this._languageSelect.appendChild(option);
            }
        }
    }

    public changeLanaguage = (lang: string) => {
        this._languageSelect.value = lang;
    }
}
