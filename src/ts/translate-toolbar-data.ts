
import { CUI } from "@cui/core";
import { TranslateGroup, TranslateGroupSource, TranslateKeySource } from "translate-go/translate.interface";
import { TranslateConst } from "translate-go/config/translate-config";

export class TranslateToolbarData {
    constructor(
        private keyName
        , private languages
        , private groups: TranslateGroup[]
    ) {
    }

    public getSources(groupName: string): TranslateGroupSource[] {
        return this.groups[groupName];
    }

    /**
     * 載入資源
     * @param sources
     */
    public load(groupName: string, keySource: TranslateKeySource) {
        let group = this.findGroup(groupName);
        if (!group) {
            group = {
                name: groupName,
                sources: []
            };
            this.addGroup(group);
        }
        let source, loadSource;
        let addLanguages;
        for (let key in keySource) {
            loadSource = keySource[key];
            for (let i in group.sources) {
                source = group.sources[i];
                if (source && source[TranslateConst.Key] == key) {
                    break;
                } else {
                    source = undefined;
                }
            }
            loadSource[TranslateConst.Type] = '1';
            if (source) {
                CUI.deepClone(source, loadSource);
            } else {
                group.sources.push(loadSource);
            }
        }
        if (loadSource) {
            addLanguages = this.findAddLanguage(loadSource);
            for (let i in addLanguages) {
                this.extendSourceByLanguage(addLanguages[i]);
            }
        }
    }

    /**
     * 新增語系
     * @param lang
     */
    public addLanguage(lang: string) {
        if (lang && TranslateConst.IgnoreKeyArray.indexOf(lang) == -1 && this.languages.indexOf(lang) == -1) {
            this.languages.push(lang);
            this.extendSourceByLanguage(lang);
        } else {
            return lang + '已存在';
        }
    }

    /**
     * 移除語系
     * @param lang
     */
    public removeLanguage(lang: string) {
        let index = this.languages.indexOf(lang);
        if (lang && TranslateConst.IgnoreKeyArray.indexOf(lang) == -1 && index != -1) {
            this.languages.splice(index, 1);
            this.reduceSourceByLanguage(lang);
            return '';
        } else {
            return lang + '不存在';
        }
    }

    public indexOfGroup(groupName: string): number {
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].name == groupName) {
                return i;
            }
        }
        return -1;
    }

    public findGroup(groupName: string): TranslateGroup {
        for (let i in this.groups) {
            if (this.groups[i].name == groupName) {
                return this.groups[i];
            }
        }
    }

    /**
     *
     * @param groupName
     */
    public addGroup(group: TranslateGroup) {
        if (group && group.name && this.indexOfGroup(group.name) == -1) {
            this.groups.push(group);
            return '';
        } else {
            return group.name + '已存在';
        }
    }

    public removeGroup(group: TranslateGroup) {
        let index = this.groups.indexOf(group);
        if (index != -1) {
            this.groups.splice(index, 1);
            return '';
        } else {
            return group.name + '不存在';
        }
    }

    /**
     * 插入資源到第一筆
     * @param sources
     */
    public addSource(group: TranslateGroup, source?: TranslateGroupSource) {
        if (!source) {
            source = {};
            source[TranslateConst.Type] = '0';
        }
        for (let i in this.languages) {
            let value = source[this.languages[i]];
            if (value == undefined) {
                value = '';
            }
            source[this.languages[i]] = value;
        }
        group.sources.splice(0, 0, source);
    }

    /**
     *
     * @param index
     */
    public removeSource(
        group: TranslateGroup
        , index: number
    ) {
        let sources = group.sources;
        if (isNaN(index) || index < 0) {
            return;
        }
        sources.splice(index, 1);
    }

    /**
     *
     * @param groupName
     * @param lang
     */
    public sourcesToArray(group: TranslateGroup, lang: string): string[] {
        let array = [];
        for (let i in group.sources) {
            array.push(group.sources[i][lang]);
        }
        return array;
    }

    /**
     *
     * @param groupName
     * @param lang
     * @param array
     */
    public updateSources(group: TranslateGroup, lang: string, array: string[]) {
        if (!array) { return; }
        if (this.languages.indexOf(lang) == -1 && lang != this.keyName) {
            return;
        }
        for (let i in array) {
            if (!group.sources[i]) {
                group.sources[i] = {};
                group.sources[i][this.keyName] = '';
            }
            if (lang == this.keyName) {
                group.sources[i][lang] = array[i]
                    .replace(/[\r\n\-\^\[\]\/\\`\+~!@#$^&*()=|{}':;',.<>?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]+/g, ' ')
                    .replace(/[\s]+./g, this.spaceToUp)
                    .replace(/^./, this.firstWordToUp)
                    .trim();
            } else {
                group.sources[i][lang] = array[i];
            }
        }
    }

    public sort(sources: TranslateGroupSource[], lang: string, desc: boolean) {
        if (desc) {
            sources.sort(function (a, b) {
                return String(a[lang]).localeCompare(String(b[lang]));
            });
        } else {
            sources.sort(function (a, b) {
                return String(b[lang]).localeCompare(String(a[lang]));
            });
        }
    }

    /**
     * 找出翻譯資源增加的語系
     * @param source
     */
    private findAddLanguage(source: TranslateGroupSource) {
        let addLanguages = [];
        for (let lang in source) {
            if (TranslateConst.IgnoreKeyArray.indexOf(lang) != -1) {
                continue;
            }
            if (this.languages.indexOf(lang) == -1) {
                this.languages.push(lang);
                addLanguages.push(lang);
            }
        }
        return addLanguages;
    }

    /**
     * 依語系拓展翻譯資源
     * @param lang
     */
    private extendSourceByLanguage(lang: string) {
        if (TranslateConst.IgnoreKeyArray.indexOf(lang) != -1) {
            return;
        }
        for (let i in this.groups) {
            let sources = this.groups[i].sources;
            for (let j in sources) {
                let value = sources[j][lang];
                if (value == undefined) {
                    value = '';
                }
                sources[j][lang] = value;
            }
        }
    }

    /**
     * 移除翻譯資源裡的語系資料
     * @param lang
     */
    private reduceSourceByLanguage(lang: string) {
        for (let i in this.groups) {
            let sources = this.groups[i].sources;
            for (let j in sources) {
                delete sources[j][lang];
            }
        }
    }

    /**
     * 產生key
     * @param s
     */
    private spaceToUp(s) {
        return s.trim().toUpperCase();
    }

    /**
     * 產生key
     * @param s
     */
    private firstWordToUp(s) {
        if (isNaN(Number(s))) {
            return s.trim().toUpperCase();
        } else {
            return 'Key' + s;
        }
    }
}
