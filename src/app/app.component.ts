import ToolbarKey from 'ts/translate/toolbar.key';
import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { getTranslateGO } from 'translate-go/translate-go';
import { toolbarSources } from 'ts/translate/toolbar.sources';
import { ToolViewComponent } from './dialog/tool-view/tool-view.component';
import { TranslateEvent } from 'translate-go/constant';
import { TranslateOnSave, TranslateToolbar } from 'translate-go/interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, TranslateToolbar, OnDestroy {
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

  constructor(private elementRef: ElementRef, private zone: NgZone) {
    this.currentLanguage = this.translateGO.getLanguage();

    let space = document.createElement('div');
    space.className = 'ttb-space';
    document.body.appendChild(space);

    this.translateGO.addEventListener(TranslateEvent.SourceChanged, () => {
      this.zone.run(() => {
        this.languages = this.translateGO.getLanguages();
      });
    });
    this.translateGO.loadAll(toolbarSources, this.toolbarGroup);
  }

  ngAfterViewInit(): void {
    this.translateGO.addEventListener(TranslateEvent.LanguageChanged, () => {
      this.zone.run(() => {
        this.currentLanguage = this.translateGO.getLanguage();
      });
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
