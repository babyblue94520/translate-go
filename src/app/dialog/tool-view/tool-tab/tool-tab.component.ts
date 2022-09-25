import Loop from 'ts/util/loop';
import ToolbarKey from 'ts/translate/toolbar.key';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Delay } from 'ts/lib/cui/core/decorators/delay';
import { DomUtil } from 'ts/util/dom-util';
import { DownloadDialogComponent } from 'app/dialog/download-dialog/download-dialog.component';
import { getTranslateGO } from 'translate-go/translate-go';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Sort, TranslateEvent } from 'translate-go/constant';
import { StickyTable } from 'ts/util/sticky-table';
import { Translate, TranslateOnSave, TranslateRecord, TranslateSource } from 'translate-go/interface';

@Component({
  selector: 'tool-tab',
  templateUrl: './tool-tab.component.html',
  styleUrls: ['./tool-tab.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToolTabComponent),
    multi: true,
  }]
})
export class ToolTabComponent implements AfterViewInit, OnDestroy {
  public readonly ToolbarKey = ToolbarKey;

  public readonly key = 'key';

  private readonly split = '\n----------------\n';

  private readonly translateGO = getTranslateGO();

  @ViewChild(DownloadDialogComponent)
  private downloadDialog: DownloadDialogComponent;

  @ViewChild('table')
  private tableRef: ElementRef;

  @Input()
  set languages(languages: string[]) {
    this._languages = languages;
    this.init();
  }

  _languages: string[] = [];

  @Input()
  private onSave: TranslateOnSave;

  public value;

  public group: string = '';


  public records: TranslateRecord[] = [];

  private keyCount = {};

  private orderBy = {
    name: this.key
    , sort: Sort.ASC
  };

  public originRecords: TranslateRecord[] = [];

  public newLanguage = 'zh-TW';

  public newLanguageMessage = '';

  public newGroup = 'New';

  public keyword = '';

  private filterRecords = [];

  public filterCount = 0;

  public propertyText = {};

  private changes = {};

  public focus: HTMLElement;

  private stickyTable: StickyTable;


  constructor(private cdf: ChangeDetectorRef, private zone: NgZone) {
  }

  ngAfterViewInit() {
    this.translateGO.addEventListener(TranslateEvent.SourceChanged, () => {
      this.zone.run(() => {
        this.init();
      });
    });

    this.stickyTable = new StickyTable(this.tableRef.nativeElement, {
      head: {
        cols: 2
      },
      body: {
        cols: 2
      }
    });
  }

  ngOnDestroy() {
    this.translateGO.removeAllEventListener(this);
  }


  onChange = (_) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.cdf.markForCheck();
    this.value = value;
    this.group = value;
    this.init();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public isFocus(element): boolean {
    return this.focus == element;
  }

  public onFocus(element) {
    if (this.focus == element) return;
    this.focus = element;
    this.focusEditor();
  }

  public onBlur() {
    this.focus = undefined;
  }

  @Delay()
  public focusEditor() {
    if (this.focus) {
      let editor: HTMLInputElement | HTMLTextAreaElement = this.focus.querySelector('input,textarea');
      if (editor) {
        editor.focus();
        editor.select();
      }
    }
  }

  public rename() {
    this.onChange(this.value);
    this.onTouched();
    this.translateGO.loadAll(this.translateGO.getLanguageSource(this.group), this.value);
    this.translateGO.removeLanguageSource(this.group);
  }

  public isGroupChange(): boolean {
    return this.value != this.group;
  }

  public save() {
    if (this.onSave instanceof Function) {
      this.onSave(this.getChanges());
    } else {
      let records = this.records;
      let sources = {};
      for (let record of records) {
        for (let language of this._languages) {
          (sources[language] || (sources[language] = {}))[record.key] = record[language];
        }
      }
      for (let language in sources) {
        this.translateGO.load(language, sources[language], this.group);
      }
      this.init();
    }
  }

  public openDownload() {
    this.downloadDialog.open(
      this.group
      , this.records
    );
  }

  public getKeyClass(key: string): string {
    return (this.keyCount[key] || 0) > 1 ? 'duplicate' : '';
  }

  @Delay(50)
  public filter() {
    this.cdf.markForCheck();
    Loop.of(this.records)
      .call(loop => this.addFilterHandler(loop))
      .call(loop => this.addUpdateAllTextHandler(loop))
      .run();
  }

  public isFilter(i: number): boolean {
    return this.filterRecords[i];
  }

  public sortClass(name: string): string {
    if (this.orderBy.name == name) {
      return 'pointer ' + (this.orderBy.sort == Sort.DESC ? 'cui-icon-down' : 'cui-icon-up');
    } else {
      return 'pointer';
    }
  }

  public sortChange(name: string) {
    this.orderBy.name = name;
    this.orderBy.sort *= -1;
    this.records.sort((a, b) => {
      return (a[name] || '').localeCompare(b[name]) * this.orderBy.sort;
    });
    this.originRecords.sort((a, b) => {
      return (a[name] || '').localeCompare(b[name]) * this.orderBy.sort;
    });

    Loop.of(this.records)
      .call(loop => this.addUpdateAllTextHandler(loop))
      .run();
  }

  @Delay(200)
  public onRecordChange(name: string) {
    this.cdf.markForCheck();
    Loop.of(this.records)
      .call(loop => {
        if (name == this.key) {
          this.addKeyCountHandler(loop);
        }
      })
      .call(loop => this.addUpdateTextHandler(name, loop))
      .call(loop => this.addChangeHandler(name, loop))
      .run();
  }

  @Delay(200)
  public onTextChange(name: string) {
    this.cdf.markForCheck();
    let text = this.propertyText[name] || '';
    if (!text.trim()) { return; }
    let messages = text.split(this.split);
    Loop.of(this.records)
      .handler((record, i) => {
        record[name] = messages[i];
      })
      .call(loop => {
        if (name == this.key) {
          this.addKeyCountHandler(loop);
        }
      })
      .call(loop => this.addChangeHandler(name, loop))
      .run();
  }

  public addSource() {
    this.records.unshift(this.buildRecord());

    Loop.of(this.records)
      .call(loop => this.addFilterHandler(loop))
      .call(loop => this.addUpdateAllTextHandler(loop))
      .call(loop => this.addAllChangeHandler(loop))
      .after(() => {
        this.filterCount++;
        this.filterRecords[0] = true;
      })
      .run();
  }

  public removeSource(record: TranslateRecord) {
    let records = this.records;
    let index = records.indexOf(record);
    if (index == -1) { return; }
    records.splice(index, 1);
    Loop.of(this.records)
      .call(loop => this.addFilterHandler(loop))
      .call(loop => this.addUpdateAllTextHandler(loop))
      .call(loop => this.addAllChangeHandler(loop))
      .run();
  }

  public copy(name: string) {
    DomUtil.copyText(this.propertyText[name]);
  }

  public isChange() {
    for (let name in this.changes) {
      if (this.changes[name]) return true;
    }
    return false;
  }

  @Delay(50)
  public init() {
    this.cdf.markForCheck();
    let records = this.originRecords = [];
    let keyRecord = {};
    let languageSource = this.translateGO.getLanguageSource(this.group) || {};
    if (languageSource) {
      for (let language of this._languages) {
        let source = languageSource[language];
        if (!source) continue;
        for (let key in source) {
          let record = keyRecord[key];
          if (!record) {
            records.push((record = keyRecord[key] = this.buildRecord()));
            record.key = key;
          }
          record[language] = this.getMessageOrKey(source, key);
        }
      }
    }
    this.reset();
  }

  public reset() {
    this.records.length = this.originRecords.length;
    Loop.of(this.originRecords)
      .handler((record, i) => {
        this.records[i] = Object.assign(this.buildRecord(), record);
      })
      .run();

    Loop.of(this.records)
      .call(loop => this.addFilterHandler(loop))
      .call(loop => this.addKeyCountHandler(loop))
      .call(loop => this.addUpdateAllTextHandler(loop))
      .call(loop => this.addAllChangeHandler(loop))
      .run();
  }

  public addFilterHandler(loop: Loop<TranslateRecord>): void {
    let keyword = this.keyword.toLowerCase();
    loop.before((array) => {
      this.filterCount = array.length;
      this.filterRecords.length = array.length;
      this.filterRecords.fill(true);
    });
    if (keyword) {
      loop.handler((record, i) => {
        for (let name in record) {
          let value = (record[name] || '').toLowerCase();
          if (value.indexOf(keyword) > -1) {
            return;
          }
        }
        this.filterCount--;
        this.filterRecords[i] = false;
      });
    }
  }

  private addKeyCountHandler(loop: Loop<TranslateRecord>) {
    this.keyCount = {};
    loop.handler((record) => {
      this.keyCount[record.key] = (this.keyCount[record.key] || 0) + 1;
    });
  }

  private addChangeHandler(name: string, loop: Loop<TranslateRecord>,) {
    let change = false;
    loop.handler((record, i) => {
      let origin = this.originRecords[i];
      if (!origin || record[name] != origin[name]) {
        change = true;
        return true;
      }
    }).after(() => {
      this.changes[name] = change;
    });
  }

  private addUpdateTextHandler(name: string, loop: Loop<TranslateRecord>) {
    let text = '';
    loop.handler((record, i) => {
      if (this.isFilter(i)) {
        text += this.split + record[name];
      }
    }).after(() => {
      this.propertyText[name] = text.substring(this.split.length);
    });
  }

  private addAllChangeHandler(loop: Loop<TranslateRecord>,) {
    for (let name in this.propertyText) {
      this.addChangeHandler(name, loop);
    }
  }

  private addUpdateAllTextHandler(loop: Loop<TranslateRecord>) {
    let texts = this.propertyText = {};
    texts[this.key] = '';
    for (let language of this._languages) {
      texts[language] = '';
    }

    for (let name in this.propertyText) {
      this.addUpdateTextHandler(name, loop);
    }
  }

  private buildRecord(): TranslateRecord {
    let record: TranslateRecord = {
      key: ''
    };
    this._languages.forEach(language => {
      this.getMessageOrKey(record, language);
    });
    return record;
  }

  private getMessageOrKey(record: TranslateRecord | TranslateSource, name: string): string {
    if (record[name] == undefined || record[name] == '') {
      record[name] = record.key ? '!key@' + record.key : '';
    }
    return record[name];
  }

  private getChanges() {
    let changes = {
      change: false
      , adds: []
      , modifies: []
      , removes: []
    };

    let removeMap = this.toMap(this.originRecords);
    let records = this.records;
    for (let record of records) {
      let key = record[this.key];
      for (let language of this._languages) {
        let value = record[language];
        let index = this.toIndex(key, language);
        let obj = removeMap[index];
        removeMap[index] = undefined;
        if (obj) {
          if (obj.message != value) {
            changes.modifies.push(this.buildTranslate(key, language, value));
          }
        } else {
          changes.adds.push(this.buildTranslate(key, language, value));
        }
      }
    }

    for (let key in removeMap) {
      let data = removeMap[key];
      if (data) {
        changes.removes.push(data);
      }
    }

    changes.change = changes.adds.length > 0 || changes.modifies.length > 0 || changes.removes.length > 0;
    return changes;
  }

  private toMap(array: TranslateRecord[]): { [key: string]: Translate } {
    let map = {};
    array.forEach((record, i) => {
      for (let name in record) {
        if (name == this.key) continue;
        map[this.toIndex(record.key, name)] = this.buildTranslate(record.key, name, record[name]);
      }
    });
    return map;
  }

  private buildTranslate(key: string = '', language: string = '', message: string = ''): Translate {
    return {
      group: this.group
      , key: key
      , language: language
      , message: message
    };
  }

  private toIndex(key: string, language: string) {
    return key + '-' + language;
  }


}

