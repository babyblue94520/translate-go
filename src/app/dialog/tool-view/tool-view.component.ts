import ToolbarKey from 'ts/translate/toolbar.key';
import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Delay, toDelayFn } from 'ts/lib/cui/core/decorators/delay';
import { DialogComponent } from 'app/app-common/component/dialog/dialog.component';
import { getTranslateGO } from 'translate-go/translate-go';
import { ImportDialogComponent } from '../import-dialog/import-dialog.component';
import { TabGroupComponent } from 'app/app-common/component/tabs/tab-group/tab-group.component';
import { TookTime, toTookTimeFn } from 'ts/lib/cui/core/decorators/took-time';
import { TranslateEvent } from 'translate-go/constant';
import { TranslateFile, TranslateOnSave } from 'translate-go/interface';

@Component({
  selector: 'tool-view',
  templateUrl: './tool-view.component.html',
  styleUrls: ['./tool-view.component.scss']
})
export class ToolViewComponent implements AfterViewInit, OnDestroy {
  public readonly ToolbarKey = ToolbarKey;

  private readonly translateGO = getTranslateGO();

  @ViewChild(DialogComponent)
  private dialog: DialogComponent;

  @ViewChild(TabGroupComponent)
  private tabGroup: TabGroupComponent;

  @ViewChild(ImportDialogComponent)
  private importDialog: ImportDialogComponent;

  public newLanguage = 'zh-TW';

  public newLanguageMessage = '';

  public newGroup = 'New';

  public languages = [];

  public groups: string[] = [];

  private prepardActiveGroup = '';

  @Input()
  public onSave: TranslateOnSave;

  constructor(private cdf: ChangeDetectorRef, private zone: NgZone) {
  }

  ngAfterViewInit() {
    this.translateGO.addEventListener(TranslateEvent.SourceChanged, () => {
      if (this.dialog.isOpen()) {
        this.zone.run(() => {
          this.init();
        });
      }
    });
  }

  ngOnDestroy() {
    this.translateGO.removeAllEventListener(this);
  }

  public open() {
    this.init();
    this.dialog.open();
  }

  public isDisableLanguageButton(): boolean {
    return !this.newLanguage || this.languages.indexOf(this.newLanguage) != -1;
  }

  public addLanguage() {
    let language = this.newLanguage, languages = this.languages;
    if (!language || languages.indexOf(language) > -1) {
      return;
    }
    this.languages = [language, ...languages];
  }

  public removeLanguage(language: string) {
    let languages = this.languages;
    let index = languages.indexOf(language);
    if (index == -1) return;
    if (!window.confirm(`${this.translateGO.get('{SureDelete}')} '${language}'?`)) {
      return;
    }
    languages.splice(index, 1);
  }

  public isDisableGroupButton(): boolean {
    return !this.newGroup;
  }

  public addGroup() {
    let group = this.newGroup;
    if (this.groups.indexOf(group) != -1) {
      alert(group + ' does exist!');
      return;
    }
    this.groups.unshift(this.newGroup);
    this.activeTab(0);
  }

  public activeTab = toDelayFn((index: number) => {
    this.cdf.markForCheck();
    if (this.tabGroup) {
      this.tabGroup.active(index);
    }
  });

  public onGroupChange(group: string) {
    this.prepardActiveGroup = group;
  }

  public onGroupClose = (index: number, group: string) => {
    this.removeGroup(group);
  }

  public removeGroup(group: string) {
    if (!window.confirm(`${this.translateGO.get('{SureDelete}')} '${group}'?`)) {
      return;
    }
    let index = this.groups.indexOf(group);
    if (index == -1) return;
    this.translateGO.removeLanguageSource(group);
  }

  public openSourceDialog() {
    this.importDialog.open(this.languages);
  }

  public importSource = toTookTimeFn((group: string, sourceFiles: TranslateFile[]) => {
    this.prepardActiveGroup = group;
    for (let file of sourceFiles) {
      this.translateGO.load(file.language, JSON.parse(file.content), group);
    }
  });

  @Delay(50)
  @TookTime
  public init() {
    this.cdf.markForCheck();
    let groups = this.translateGO.getGroups();
    this.groups.length = 0;
    for (let i in groups) {
      this.groups[i] = groups[i];
    }
    this.languages = this.translateGO.getLanguages();
    if (this.prepardActiveGroup) {
      this.activeTab(this.groups.indexOf(this.prepardActiveGroup));
      this.prepardActiveGroup = undefined;
    }
  }
}
