import { Cache, CUI, Grid } from '@cui/core';
import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from 'app/app-common/component/dialog/dialog.component';
import { DomUtil } from 'ts/util/dom-util';
import { getTranslateGO, TranslateConfig } from 'translate-go/lib';
import { TranslateConst } from 'translate-go/config/translate-config';
import { TranslateGroup, TranslateGroupSource, TranslateKeySource } from 'translate-go/translate.interface';
import { TranslateToolbarData } from 'ts/translate-toolbar-data';

interface TranslateGroupGrid extends TranslateGroup {
  grid?: Grid.Grid<any>;
}

enum Message {
  ConfirmRemove = '確定要移除'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private translateData: TranslateToolbarData;
  public translateConfig = TranslateConfig;
  public newLanguage = 'zh_TW';
  public newLanguageMessage = '';
  public prefix = 'TranslateSource';
  public newGroup = 'New';
  public newGroupMessage = '';
  public originSourceTextareaValue = '';
  public originSourcePlaceholder = 'var example = {"key1":{"key":"key","en":"文字1","zh_TW":"文字1"...},"key2":{"key":"key2","en":"文字2","zh_TW":"文字2"...}};window.__translateGO_example=example;';

  public keyName;
  public defaultLanguage;
  public translateGO = getTranslateGO();

  // 未處理資料
  public nonTranslateGroup: TranslateGroupGrid = {
    name: 'nonTranslate',
    sources: []
  };
  // 忽略資料
  public ignoreGroup: TranslateGroupGrid = {
    name: 'ignore',
    sources: []
  };

  @Cache.session('Index', {})
  public ignoreKeys;
  @Cache.session('Index', [TranslateConfig.defaultLanguage])
  public languages;
  // 群組
  @Cache.session('Index', [{ name: 'All', sources: [] }])
  public groups: TranslateGroupGrid[];

  // 重複Key
  public repeatValue = '';
  // 語言列出資料
  public langValues = {};

  public currentLanguage;
  public currentGroup: TranslateGroupGrid;
  public currentSource;

  @ViewChild('sourceDialog')
  public sourceDialog: DialogComponent;

  public show = false;

  constructor() {
    this.keyName = TranslateConst.Key;
    this.defaultLanguage = TranslateConfig.defaultLanguage;
    this.currentLanguage = this.defaultLanguage;
    this.nonTranslateGroup.grid = this.buildNonTranslateGrid();
    this.ignoreGroup.grid = this.buildIgnoreGrid();
    this.translateData = new TranslateToolbarData(this.keyName, this.languages, this.groups);
    this.loadWindowGroups();
    if (TranslateConfig.dev && !this.translateGO.isWatch()) {
      this.translateGO.start();
      this.refresh();
    }

    let space = document.createElement('div');
    space.className = 'ttb-space';
    document.body.appendChild(space);
  }

  /**
   * 切換開發模式
   */
  public start() {
    TranslateConfig.dev = true;
    this.translateGO.start();
    this.refresh();
  }

  public stop() {
    TranslateConfig.dev = false;
    this.translateGO.stop();
  }

  /**
   * 刷新
   */
  public refresh() {
    this.reLoadTranslateGO();
    this.loadNonTranslate();
    this.currentGridLoad();
  }

  /**
   * 刷新
   */
  public refreshNonTranslate() {
    this.loadNonTranslate();
    this.currentGridLoad();
  }

  /**
   * 載入在window底下的翻譯資源
   */
  public loadWindowGroups() {
    for (let name in window) {
      if (name.indexOf(TranslateConst.GroupPrefix) != -1) {
        let keySource: TranslateKeySource = window[name];
        let groupName = name.replace(TranslateConst.GroupPrefix, '');
        this.translateData.load(groupName, keySource);
      }
    }
    this.initGroupGrids();
    this.currentGridLoad();
  }

  /**
   * 初始化Group Grid
   */
  private initGroupGrids() {
    for (let i in this.groups) {
      this.groups[i].grid = this.buildGrid(this.groups[i]);
    }
  }

  /**
   * 更換當前語系
   */
  public changeLanguage() {
    this.translateGO.translate(this.currentLanguage);
  }

  /**
   * 開啟翻譯工具
   */
  public openToolDialog() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
      this.loadNonTranslate();
      this.ignoreToSource();
      this.translateGO.translate(this.currentLanguage);
    }
  }

  /**
   * 將當前編輯的翻譯資料載入TranslateGO
   */
  private reLoadTranslateGO() {
    for (let i in this.groups) {
      this.translateGO.reload(this.formatGroupSources(this.groups[i].sources));
    }
  }

  /**
   * 載入未翻譯
   */
  public loadNonTranslate() {
    let sources = [];
    let texts = this.translateGO.getNonTranslateText();
    if (CUI.isEmptyObject(this.ignoreKeys)) {
      for (let text in texts) {
        texts[text][TranslateConst.Type] = '0';
        sources.push(texts[text]);
      }
    } else {
      for (let text in texts) {
        if (!this.ignoreKeys[text]) {
          texts[text][TranslateConst.Type] = '0';
          sources.push(texts[text]);
        }
      }
    }
    this.nonTranslateGroup.sources = sources;
  }

  /**
   * 忽略的key轉換成翻譯資源
   */
  public ignoreToSource() {
    let sources = [];
    for (let text in this.ignoreKeys) {
      sources.push(this.buildAddSource(text));
    }
    this.ignoreGroup.sources = sources;
  }

  /**
   * 建立翻譯資源
   * @param text
   */
  private buildAddSource(text: string): TranslateGroupSource {
    let source = {};
    source[TranslateConst.Type] = '0';
    source[this.defaultLanguage] = text;
    return source;
  }

  /**
   * group active
  */
  public groupActive: Function = (group: TranslateGroupGrid) => {
    this.currentGroup = group;
    this.currentGridLoad();
  }

  /**
   * 檢查是否有重複的key
   */
  public checkRepeat() {
    let keys = {};
    this.repeatValue = '';
    for (let i in this.groups) {
      let sources = this.groups[i].sources;
      for (let j in sources) {
        let source = sources[j];
        let key = source[TranslateConst.Key];
        let repeat = keys[key];
        if (repeat) {
          this.repeatValue += key + ',';
          source[TranslateConst.Repeat] = '1';
          repeat[TranslateConst.Repeat] = '1';
        } else {
          keys[key] = source;
          source[TranslateConst.Repeat] = '';
        }
      }
    }
    this.currentGridLoad();
  }

  /**
   * 載入來源翻譯資料
   */
  public loadOriginSource() {
    if (!this.originSourceTextareaValue) { return; }
    try {
      // tslint:disable-next-line:no-eval
      eval(this.originSourceTextareaValue);
      this.loadWindowGroups();
    } catch (e) {
      console.error(e);
      alert('載入失敗：' + e.message);
    }
  }

  /**
   * 開啟 Source dialog
   */
  public openSourceDialog(source, e: Event) {
    e.stopPropagation();
    this.currentSource = source;
    this.sourceDialog.open();
  }

  /**
   * 關閉 dialog
  */
  public closeSourceDialog = () => {
    this.currentGridReLoad();
  }

  /**
   * 列出
   * @param lang
   */
  public sourceToValue(group: TranslateGroupGrid, lang: string) {
    this.langValues[group.name + lang] = this.translateData.sourcesToArray(group, lang).join('\n');
  }

  /**
   * 載入
   * @param lang
   */
  public valueToSource(group: TranslateGroupGrid, lang: string) {
    if (!this.langValues[group.name + lang]) {
      return;
    }
    let array = this.langValues[group.name + lang].split('\n');
    this.translateData.updateSources(group, lang, array);
    this.currentGridReLoad();
  }

  /**
   * 增加語系
   */
  public addLanguage() {
    this.newLanguageMessage = this.translateData.addLanguage(this.newLanguage);
    this.initGroupGrids();
    if (this.currentGroup) {
      this.currentGridReLoad();
    }
  }

  /**
   * 移除一欄
   * @param lang
   */

  public removeLanguage(lang: string) {
    if (window.confirm(Message.ConfirmRemove + lang + '?')) {
      this.translateData.removeLanguage(lang);
      this.initGroupGrids();
      if (this.currentGroup) {
        this.currentGridReLoad();
      }
    }
  }

  /**
   *
   * @param groupName
   */
  public findGroup(groupName: string) {
    for (let i in this.groups) {
      if (this.groups[i].name == groupName) {
        return this.groups[i];
      }
    }
  }

  /**
   * 增加群組
   */
  public addGroup() {
    let group: TranslateGroupGrid = {
      name: this.newGroup,
      sources: []
    };
    this.newGroupMessage = this.translateData.addGroup(group);
    if (!this.newGroupMessage) {
      group.grid = this.buildGrid(group);
    }
  }

  /**
   * 清除群組
   */
  public removeGroup(group: TranslateGroupGrid) {
    if (window.confirm(Message.ConfirmRemove + group.name + '翻譯資料?')) {
      this.translateData.removeGroup(group);
    }
  }

  /**
   * 改變群組
  */
  public changeGroup(
    oldGroup: TranslateGroupGrid
    , newGroup: TranslateGroupGrid
    , record: TranslateGroupSource
    , index: number
    , e: Event
  ) {
    e.stopPropagation();
    this.translateData.addSource(newGroup, record);
    this.translateData.removeSource(oldGroup, index);
    this.currentGridReLoad();
  }

  /**
   * 清除忽略的資料
   */
  public cleanIgnoreGroup() {
    if (window.confirm(Message.ConfirmRemove + '所有忽略資源?')) {
      this.ignoreGroup.sources.length = 0;
      this.ignoreKeys = {};
      this.currentGridLoad();
    }
  }

  /**
   *
   */
  public ignoreSource(record: TranslateGroupSource, index: number, e: Event) {
    e.stopPropagation();
    this.ignoreKeys[record[this.defaultLanguage]] = 1;
    this.translateData.addSource(this.ignoreGroup, record);
    this.translateData.removeSource(this.nonTranslateGroup, index);
    this.currentGridReLoad();
  }

  /**
   * 改變群組
  */
  public ignoreChangeGroup(
    newGroup: TranslateGroupGrid
    , record: TranslateGroupSource
    , index: number
    , e: Event
  ) {
    e.stopPropagation();
    this.translateData.addSource(newGroup, record);
    this.translateData.removeSource(this.ignoreGroup, index);
    delete this.ignoreKeys[record[this.defaultLanguage]];
    this.currentGridReLoad();
  }

  /**
   * 增加翻譯資料
   */
  public addSource(group: TranslateGroupGrid) {
    this.translateData.addSource(group);
    this.currentGridReLoad();
  }

  /**
   * 移除一列
   * @param index
   */
  public removeSource(
    group: TranslateGroupGrid
    , record: TranslateGroupSource
    , index: number
    , e: Event
  ) {
    e.stopPropagation();
    this.translateData.removeSource(group, index);
    this.currentGridReLoad();
    delete this.ignoreKeys[record[this.defaultLanguage]];
  }

  /**
   * 清除群組
   */
  public removeAllSource(group: TranslateGroupGrid) {
    if (window.confirm(Message.ConfirmRemove + group.name + '所有翻譯資料?')) {
      group.sources.length = 0;
      this.currentGridReLoad();
    }
  }

  /**
   * 格式化sources 成為輸出的資料格式
   * @param sources
   */
  private formatGroupSources(sources: TranslateGroupSource[]) {
    let result = {};
    for (let i in sources) {
      let source = CUI.deepClone(sources[i]);
      delete source[TranslateConst.Repeat];
      delete source[TranslateConst.Type];
      result[source[this.keyName]] = source;
    }
    return result;
  }

  /**
   * 當前表格載入資料
   */
  private currentGridLoad() {
    if (this.currentGroup) {
      this.currentGroup.grid.load();
    }
  }

  /**
   * 當前表格重新載入資料
   */
  private currentGridReLoad() {
    if (this.currentGroup) {
      this.currentGroup.grid.reload();
    }
  }

  /**
   * 將所有翻譯資料合併下載成JS
   */
  public downloadJSAll() {
    let fileData = '';
    for (let i in this.groups) {
      fileData += this.groupToJs(this.groups[i]);
    }
    this.doDownload(this.prefix + '.js', new Blob([fileData], { type: 'application/javascript' }));
  }

  /**
   * 將所有翻譯資料合併下載成TS
   */
  public downloadTSAll() {
    let fileData = '';
    for (let i in this.groups) {
      fileData += this.groupToTs(this.groups[i]);
    }
    this.doDownload(this.prefix + '.ts', new Blob([fileData], { type: 'application/javascript' }));
  }

  /**
   * 將翻譯資料下載成JS
   */
  public downloadJS(group: TranslateGroupGrid) {
    if (group) {
      this.doDownload(
        this.prefix + group.name + '.js'
        , new Blob([this.groupToJs(group)], { type: 'application/javascript' })
      );
    }
  }

  /**
   * 將翻譯資料下載成TS
   */
  public downloadTS(group: TranslateGroupGrid) {
    if (group) {
      this.doDownload(
        this.prefix + group.name + '.ts'
        , new Blob([this.groupToTs(group)], { type: 'application/javascript' })
      );
    }
  }

  /**
   * 轉換成js字串
   * @param group
   */
  private groupToJs(group: TranslateGroupGrid) {
    let varName = this.prefix + group.name;
    let globalName = TranslateConst.GroupPrefix + group.name;
    let result = 'var ' + varName + '=' + JSON.stringify(this.formatGroupSources(group.sources)) + ';window.' + globalName + '=' + varName + ';';
    result += 'if(window[\'' + TranslateConst.Prefix + '\']!=undefined)window[\'' + TranslateConst.Prefix + '\'].reload(' + varName + ');';
    return result;
  }

  /**
   * 轉換成ts字串
   * @param group
   */
  private groupToTs(group: TranslateGroupGrid) {
    let varName = this.prefix + group.name;
    let globalName = TranslateConst.GroupPrefix + group.name;
    let keyText = 'export const ' + this.prefix + group.name + '={\n';
    for (let i in group.sources) {
      let source = group.sources[i];
      delete source[TranslateConst.Repeat];
      delete source[TranslateConst.Type];
      let str = JSON.stringify(source);
      keyText += '/**' + str + '*/\n';
      keyText += source[this.keyName] + ':' + str + ',\n';
    }

    keyText += '};\n;(<any>window).' + globalName + '=' + varName + ';';
    keyText += 'if(window[\'' + TranslateConst.Prefix + '\']!=undefined)window[\'' + TranslateConst.Prefix + '\'].reload(' + varName + ');';
    return keyText;
  }

  /**
   *
   * @param fileName
   * @param blob
   */
  private doDownload(fileName, blob) {
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    a = null;
  }

  /**
   * 產生翻譯資料群組的表格
   * @param group
   */
  private buildGrid(group: TranslateGroupGrid) {
    let languages = this.languages;
    let contentColumns = [];
    let rowColumns = [
      {
        value: '', name: '', align: 'left', width: '1%', element: true
        , onRender: (value, record, index, tr) => {
          if (record[TranslateConst.Repeat] == '1') {
            tr.classList.add('repeat');
          }
          return DomUtil.buildButton({
            text: value == '0' ? '新增' : '',
            className: 'bg-accent ttb-icon-close',
            onclick: this.removeSource.bind(this, group, record, index)
          });
        }
      }
      , { value: TranslateConst.Type, name: TranslateConst.Type, align: 'left', width: '1%', canSort: true, onRender: (value, record, index) => value == '0' ? '新增' : '舊' }
      , { value: TranslateConst.Key, name: TranslateConst.Key, align: 'left', width: '1%', canSort: true, maxWidth: '200px' }
    ];
    for (let i in languages) {
      let lang = languages[i];
      rowColumns.push({ value: lang, name: lang, align: 'left', width: '1%', canSort: true, maxWidth: '200px' });
      contentColumns.push({ value: lang, name: lang, align: 'left', width: '1%', canSort: true, maxWidth: '200px' });
    }
    rowColumns.push({
      value: '', name: '', align: 'left', width: '100%', element: true
      , onRender: (value, record, index) => {
        let buttons: any = [
          DomUtil.buildSpan({ text: group.name }),
          DomUtil.buildButton({
            text: '編輯', className: 'bg-accent',
            onclick: this.openSourceDialog.bind(this, record)
          })
        ];
        for (let i in this.groups) {
          let name = this.groups[i].name;
          if (group.name != name) {
            buttons.push(DomUtil.buildButton({
              text: name,
              className: 'small',
              onclick: this.changeGroup.bind(this, group, this.groups[i], record, index)
            }));
          }
        }
        return buttons;
      }
    });
    return Grid.GridBuilder.build({
      size: 500,
      rowColumns: rowColumns,
      contentColumns: contentColumns,
      onLoad: (pageable: Grid.IPageable, load: Grid.ILoad) => {
        if (pageable.sort && pageable.sort.length > 0) {
          for (let i in pageable.sort) {
            let keys = pageable.sort[i].split(',');
            if (keys[1] == 'DESC') {
              this.translateData.sort(group.sources, keys[0], true);
            } else {
              this.translateData.sort(group.sources, keys[0], false);
            }
          }
        }
        load(group.sources);
      }
    });
  }

  /**
   * 產生未處理的表格
   */
  private buildNonTranslateGrid() {
    return Grid.GridBuilder.build({
      size: 500,
      rowColumns: [
        {
          value: '', name: '切換群組', align: 'left', width: '1%', element: true
          , onRender: (value, record, index, tr) => {
            if (record[TranslateConst.Repeat] == '1') {
              tr.classList.add('repeat');
            }
            let buttons: any = [
              DomUtil.buildButton({
                text: '忽略',
                className: 'bg-accent',
                onclick: this.ignoreSource.bind(this, record, index)
              })];
            for (let i in this.groups) {
              buttons.push(DomUtil.buildButton({
                text: this.groups[i].name,
                onclick: this.changeGroup.bind(this, this.nonTranslateGroup, this.groups[i], record, index)
              }));
            }
            return buttons;
          }
        }
        , { value: TranslateConst.Key, name: TranslateConst.Key, align: 'left', width: '1%', canSort: true, maxWidth: '200px' }
        , { value: this.defaultLanguage, name: this.defaultLanguage, align: 'left', width: '100%', maxWidth: '1000px', canSort: true }
      ],
      contentColumns: [{ value: this.defaultLanguage, name: this.defaultLanguage, align: 'left', width: '1%', canSort: true, maxWidth: '200px' }],
      onLoad: (pageable: Grid.IPageable, load: Grid.ILoad) => {
        if (pageable.sort && pageable.sort.length > 0) {
          for (let i in pageable.sort) {
            let keys = pageable.sort[i].split(',');
            if (keys[1] == 'DESC') {
              this.translateData.sort(this.nonTranslateGroup.sources, keys[0], true);
            } else {
              this.translateData.sort(this.nonTranslateGroup.sources, keys[0], false);
            }
          }
        }
        load(this.nonTranslateGroup.sources);
      }
    });
  }

  /**
   * 產生忽略不處理的表格
   */
  private buildIgnoreGrid() {
    return Grid.GridBuilder.build({
      size: 500,
      rowColumns: [
        {
          value: '', name: '切換群組', align: 'left', width: '1%', element: true
          , onRender: (value, record, index) => {
            let buttons: any = [];
            for (let i in this.groups) {
              buttons.push(DomUtil.buildButton({
                text: this.groups[i].name,
                onclick: this.ignoreChangeGroup.bind(this, this.groups[i], record, index)
              }));
            }
            return buttons;
          }
        }
        , { value: TranslateConst.Key, name: TranslateConst.Key, align: 'left', width: '1%', canSort: true, maxWidth: '200px' }
        , { value: this.defaultLanguage, name: this.defaultLanguage, align: 'left', width: '100%', maxWidth: '1000px', canSort: true }
      ],
      contentColumns: [{ value: this.defaultLanguage, name: this.defaultLanguage, align: 'left', width: '1%', canSort: true, maxWidth: '1000px' }],
      onLoad: (pageable: Grid.IPageable, load: Grid.ILoad) => {
        if (pageable.sort && pageable.sort.length > 0) {
          for (let i in pageable.sort) {
            let keys = pageable.sort[i].split(',');
            if (keys[1] == 'DESC') {
              this.translateData.sort(this.ignoreGroup.sources, keys[0], true);
            } else {
              this.translateData.sort(this.ignoreGroup.sources, keys[0], false);
            }
          }
        }
        load(this.ignoreGroup.sources);
      }
    });
  }
}
