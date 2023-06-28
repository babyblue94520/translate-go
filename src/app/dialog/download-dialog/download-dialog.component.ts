import ToolbarKey from 'ts/translate/toolbar.key';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CUI } from '@cui/core';
import { DialogComponent } from 'app/app-common/component/dialog/dialog.component';
import { getTranslateGO } from 'translate-go/translate-go';
import { TranslateFile, TranslateRecord } from 'translate-go/interface';
import { TabComponent } from '../../app-common/component/tabs/tab/tab.component';
import { TabGroupComponent } from '../../app-common/component/tabs/tab-group/tab-group.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { DialogComponent as DialogComponent_1 } from '../../app-common/component/dialog/dialog.component';

@Component({
    selector: 'download-dialog',
    templateUrl: './download-dialog.component.html',
    styleUrls: ['./download-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [DialogComponent_1, NgIf, FormsModule, NgFor, TabGroupComponent, TabComponent]
})
export class DownloadDialogComponent {
  public readonly ToolbarKey = ToolbarKey;

  private readonly key = 'key';

  private readonly translateGO = getTranslateGO();

  @ViewChild(DialogComponent)
  private dialog: DialogComponent;

  public language: string;

  public languages: string[] = [];

  public group: string;

  public keyVarable = '';

  public keyFile: TranslateFile;

  public languageFiles: TranslateFile[] = [];

  private records: TranslateRecord[];

  public open(
    group: string
    , records: TranslateRecord[]
  ) {
    this.language = this.translateGO.getLanguage();
    this.languages = this.translateGO.getLanguages();
    this.group = group;
    this.records = records;
    this.keyFile = this.buildKeyFile(group);
    this.languageFiles = this.buildLanguageFiles(group);
    this.dialog.open();
  }

  public onLanguageChange() {
    this.keyFile = this.buildKeyFile(this.group);
  }

  public onKeyVarableChange() {
    this.keyFile = this.buildKeyFile(this.group, this.keyVarable);
  }

  public jsonToHtml(json: string): string {
    return CUI.printJson(json);
  }

  public download() {
    this.doDownload(this.keyFile.name, new Blob([this.keyFile.content], { type: 'application/javascript' }));
    for (let file of this.languageFiles) {
      this.doDownload(file.name, new Blob([file.content], { type: 'application/javascript' }));
    }
  }

  private doDownload(fileName, blob) {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    a = null;
  }

  private buildKeyFile(group: string, keyVarable?: string): TranslateFile {
    this.keyVarable = keyVarable || group[0].toUpperCase() + group.substring(1) + 'Key';
    let keys = [`export default class ${this.keyVarable} {`];
    let records = this.records;
    for (let record of records) {
      let value = record[this.key];
      keys.push(`  /** ${record[this.language]}*/`);
      keys.push(`  static readonly ${value} = '{${value}}';`);
    }
    keys.push('};')
    return {
      name: `${group}.key.ts`
      , language: this.key
      , content: keys.join('\n')
    };
  }

  private buildLanguageFiles(group: string): TranslateFile[] {
    let files: TranslateFile[] = [];
    let jsons = {};
    let records = this.records;
    let languages = this.languages;
    for (let record of records) {
      let value = record[this.key];
      for (let language of languages) {
        value = record[language];
        (jsons[language] || (jsons[language] = {}))[record.key] = value;
      }
    }
    for (let language of languages) {
      files.push({
        name: `${group}.${language}.json`
        , language: language
        , content: JSON.stringify(jsons[language])
      });
    }
    return files;
  }


}
