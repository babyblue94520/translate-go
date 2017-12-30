var TranslateToolBar = (function () {
    // private toolUrl = "http://127.0.0.1:4300/#/Index";
    // private toolOrigin = "http://127.0.0.1:4300";
    function TranslateToolBar(translateGO) {
        var _this = this;
        this.translateGO = translateGO;
        this.toolUrl = "https://babyblue94520.github.io/translate-go-tool/dist/#/Index";
        this.toolOrigin = "https://babyblue94520.github.io";
        this.start = function (e) {
            _this.translateGO.watch();
            _this.status(true);
        };
        this.stop = function (e) {
            _this.translateGO.stop();
            _this.status(false);
        };
        this.languageChange = function (e) {
            _this.translateGO.translate(_this._languageSelect.value);
        };
        this.openTool = function (e) {
            if (!_this.toolWindow || _this.toolWindow.closed) {
                _this.toolWindow = window.open(_this.toolUrl, _this.toolOrigin);
                setTimeout(function () {
                    _this.toolWindow.postMessage(_this.translateGO.getNonTranslateText(), _this.toolOrigin);
                }, 2000);
            }
            else {
                _this.toolWindow.focus();
            }
        };
        this.postNonText = function (e) {
            if (_this.toolWindow) {
                _this.toolWindow.postMessage(_this.translateGO.getNonTranslateText(), _this.toolOrigin);
                _this.toolWindow.focus();
            }
        };
        this.status = function (isStart) {
            if (isStart) {
                _this._startWatchButton.disabled = true;
                _this._stopWatchButton.disabled = false;
            }
            else {
                _this._startWatchButton.disabled = false;
                _this._stopWatchButton.disabled = true;
            }
        };
        this.updateLanaguageOption = function (array) {
            if (_this._languageSelect) {
                console.log(_this._languageSelect.value);
                _this._languageSelect.innerHTML = '';
                var option = void 0, lang = void 0;
                for (var i in array) {
                    lang = array[i];
                    option = document.createElement('option');
                    option.value = lang;
                    option.innerText = lang;
                    _this._languageSelect.appendChild(option);
                }
            }
        };
        this.changeLanaguage = function (lang) {
            _this._languageSelect.value = lang;
        };
        var style = document.createElement('style');
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
            '}'
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
        }
        else {
            window.onload = function (e) {
                document.body.appendChild(_this._element);
            };
        }
    }
    return TranslateToolBar;
}());
export { TranslateToolBar };
//# sourceMappingURL=translate-toolbar.js.map