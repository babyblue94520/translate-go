import ToolbarKey from 'ts/translate/toolbar.key';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { CUI } from '@cui/core';
import { DialogComponent } from 'app/app-common/component/dialog/dialog.component';
import { TranslateFile } from 'translate-go/interface';
import { TabComponent } from '../../app-common/component/tabs/tab/tab.component';
import { TabGroupComponent } from '../../app-common/component/tabs/tab-group/tab-group.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { DialogComponent as DialogComponent_1 } from '../../app-common/component/dialog/dialog.component';


@Component({
    selector: 'import-dialog',
    templateUrl: './import-dialog.component.html',
    styleUrls: ['./import-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [DialogComponent_1, NgIf, FormsModule, TabGroupComponent, NgFor, TabComponent]
})
export class ImportDialogComponent {
  public readonly ToolbarKey = ToolbarKey;

  @ViewChild(DialogComponent)
  private dialog: DialogComponent;

  public languages: string[] = [];
  public group: string;
  public sourceFiles: TranslateFile[] = [];

  @Input()
  public onImport = (group: string, files: TranslateFile[]) => { };

  private fileInput: HTMLInputElement;

  constructor(private cdf: ChangeDetectorRef) {
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.multiple = true;
    this.fileInput.accept = '.json';
    this.fileInput.onchange = this.onChange;
  }

  public open(languages: string[]) {
    this.group = '';
    this.sourceFiles.length = 0;
    this.languages = languages;
    this.fileInput.value = '';
    this.dialog.open();
  }

  public jsonToHtml(json: string): string {
    return CUI.printJson(json);
  }

  public selectFiles() {
    this.fileInput.click();
  }

  private onChange = () => {
    let fileList: FileList = this.fileInput.files;
    this.sourceFiles.length = 0;
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList.item(i);
      let name = file.name;
      let language = name.replace(/^(.+\.)?([^.]+)\.[^.]+$/, '$2');
      this.group = name.substring(0, name.indexOf('.'));
      let source = this.sourceFiles[i] = {
        name: name
        , language: language
        , content: ''
      }
      let reader = new FileReader();
      reader.onload = () => {
        this.cdf.markForCheck();
        source.content = <string>reader.result;
      }
      reader.readAsText(file);
    }
  }

  public onClose = () => {
    this.sourceFiles.length = 0;
  }

  public import() {
    this.onImport(this.group, this.sourceFiles);
    this.dialog.close();
  }

}
