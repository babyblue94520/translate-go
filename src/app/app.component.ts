import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateEvent } from 'translate-go/constant';
import { TranslateOnSave, TranslateToolbar } from 'translate-go/interface';
import { getTranslateGO } from 'translate-go/translate-go';
import ToolbarKey from 'ts/translate/toolbar.key';
import { toolbarSources } from 'ts/translate/toolbar.sources';
import { ToolViewComponent } from './dialog/tool-view/tool-view.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, NgFor, ToolViewComponent]
})
export class AppComponent implements AfterViewInit, OnDestroy, TranslateToolbar {
  public readonly ToolbarKey = ToolbarKey;

  public readonly translateGO = getTranslateGO();

  private readonly toolbarGroup = 'toolbar';

  public showToolbar = true;

  public showToolDialog = false;

  public languages = [];

  public currentLanguage;

  @ViewChild(ToolViewComponent)
  private viewDialog: ToolViewComponent;

  @Input()
  public onSave: TranslateOnSave;

  constructor(private elementRef: ElementRef) {
    this.translateGO.setLanguageMapping({
      'zh': 'zh-TW'
    });
    let space = document.createElement('div');
    space.className = 'ttb-space';
    document.body.appendChild(space);

    this.translateGO.addEventListener(TranslateEvent.SourceChanged, () => {
      this.languages = this.translateGO.getLanguages();
    });
    this.translateGO.loadAll(toolbarSources, this.toolbarGroup);
    this.currentLanguage = this.translateGO.getLanguage();
  }

  ngAfterViewInit(): void {
    this.translateGO.addEventListener(TranslateEvent.LanguageChanged, () => {
      this.currentLanguage = this.translateGO.getLanguage();
    });
    this.start();
    this.openToolDialog();
  }

  ngOnDestroy() {
    this.translateGO.removeAllEventListener(this);
  }

  public start() {
    this.translateGO.start();
  }

  public stop() {
    this.translateGO.stop();
  }

  public openOrClose(e) {
    let button = e.target;
    let toolbar = this.elementRef.nativeElement;
    if (this.showToolbar) {
      this.showToolbar = false;
      let w = toolbar.offsetWidth - button.offsetWidth - 15;
      toolbar.style.transform = `translateX(-${w}px)`;
    } else {
      this.showToolbar = true;
      toolbar.style.transform = `translateX(0px)`;
    }
  }

  public onLanguageSelected = () => {
    this.translateGO.translate(this.currentLanguage);
  }

  public openToolDialog() {
    this.viewDialog.open();
  }
}
