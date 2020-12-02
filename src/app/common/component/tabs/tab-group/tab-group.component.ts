import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Async } from 'ts/decorators/async';
import { Debounce } from 'ts/decorators/debounce';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  private header: HTMLElement;
  private labels: HTMLElement;
  private contents: HTMLElement;
  private prev: HTMLElement;
  private next: HTMLElement;

  public currentIndex;
  private leftIndex = 0;
  private labelsLeft = 0;

  @ViewChildren('label')
  public labelRef: QueryList<ElementRef>;

  @ContentChildren(TabComponent)
  public tabsRef: QueryList<TabComponent>;

  @Input()
  public activeIndex = 0;

  public resizeObserver;

  private labelsWidth;
  private headerWidth;

  constructor(
    private elementRef: ElementRef,
    private cdf: ChangeDetectorRef
  ) {
  }

  ngAfterViewChecked() {
    console.log(this.tabsRef)
    this.resize();
  }

  ngAfterViewInit() {
    this.tabsRef.changes.subscribe(() => {
      if (this.tabsRef.length) {
        this.initActive();
      } else {
        this.contentClear();
      }
      this.cdf.markForCheck();
    });

    this.labelRef.changes.subscribe(() => {
      if (this.labelRef.length) {
        this.hoverBar();
        this.showPrevNext();
      } else {
        this.headerClear();
      }
      this.cdf.markForCheck();
    });

    let element: HTMLElement = this.elementRef.nativeElement;
    this.header = element.querySelector('.ttb-tab-header');
    this.labels = element.querySelector('.ttb-tab-labels');
    this.contents = element.querySelector('.ttb-tab-contents');
    this.prev = element.querySelector('.ttb-tab-prev');
    this.prev.addEventListener('click', this.prevClick.bind(this));
    this.next = element.querySelector('.ttb-tab-next');
    this.next.addEventListener('click', this.nextClick.bind(this));
    this.prev.style.display = 'none';
    this.next.style.display = 'none';

    window.addEventListener('resize', this.delayResize.bind(this));

    this.resizeObserver = new MutationObserver(entries => {
      this.delayResize();
    });
    this.resizeObserver.observe(element, {
      attributes: true
      , childList: true
      , characterData: true
      , subtree: true
    });
    this.initActive();
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  @Async()
  private tabsRefChanges() {
    console.log('tabsRefChanges');
    if (this.tabsRef.length) {
      this.initActive();
    } else {
      this.contentClear();
    }
    this.cdf.markForCheck();
  }

  @Async()
  private labelRefChanges() {
    if (this.labelRef.length) {
      this.hoverBar();
      this.showPrevNext();
    } else {
      this.headerClear();
    }
    this.cdf.markForCheck();
  }

  private hasChange(): boolean {
    if (this.labels) {
      if (this.labelsWidth == this.labels.offsetWidth && this.headerWidth == this.header.offsetWidth) {
        return false;
      } else {
        this.labelsWidth = this.labels.offsetWidth;
        this.headerWidth = this.header.offsetWidth;
        return true;
      }
    }
    return false;
  }

  @Debounce(300)
  private delayResize() {
    this.resize();
  }

  private resize() {
    if (this.hasChange()) {
      this.showPrevNext();
      this.hoverBar();
      this.cdf.markForCheck();
    }
  }

  private headerClear() {
    if (this.labels) {
      this.labels.style.transform = '';
    }
  }

  private contentClear() {
    if (this.contents) {
      this.contents.style.transform = '';
    }
  }

  @Async()
  private initActive() {
    let index = 0;
    let nan = isNaN(this.currentIndex);
    if (nan || this.currentIndex > this.tabsRef.length) {
      index = nan ? this.activeIndex : (this.tabsRef.length - 1);
    } else {
      index = this.currentIndex;
    }
    let tabs = this.tabsRef.toArray();
    let tab: TabComponent;
    for (let i = 0, l = tabs.length; i < l; i++) {
      tab = tabs[i];
      if (tab.active) {
        index = i;
      }
      tab.active = false;
    }
    this.active(index);
  }

  public active(index: number) {
    if (index < 0) { return; }
    if (!this.tabsRef) { return; }
    let l = this.tabsRef.length;
    this.currentIndex = index % l;
    let tabs: TabComponent[] = this.tabsRef.toArray();
    for (let i = 0; i < l; i++) {
      if (i == this.currentIndex && tabs[i].disabled) {
        return;
      }
    }
    for (let i = 0; i < l; i++) {
      tabs[i].active = (i == this.currentIndex);
    }
    if (tabs[this.currentIndex]) {
      tabs[this.currentIndex].doActive();
    }
    this.hoverBar();
    this.cdf.markForCheck();
  }

  private showPrevNext() {
    if (this.labels) {
      if (this.labels.offsetWidth > this.header.offsetWidth) {
        if (this.labelsLeft == 0) {
          this.prev.style.display = 'none';
        } else {
          this.prev.style.display = 'block';
        }
        if (this.header.offsetWidth + this.labelsLeft < this.labels.offsetWidth) {
          this.next.style.display = 'block';
        } else {
          this.next.style.display = 'none';
        }
      } else {
        this.prev.style.display = 'none';
        this.next.style.display = 'none';
        this.labelsLeft = 0;
        this.labels.style.transform = 'translateX(0px)';
        this.hoverBar();
      }
    }
  }

  public prevClick() {
    if (this.leftIndex != 0) {
      let label: HTMLElement = this.labelRef.toArray()[--this.leftIndex].nativeElement;
      if (this.leftIndex == 0) {
        this.labelsLeft = 0;
      } else {
        this.labelsLeft -= label.offsetWidth;
      }
      this.labels.style.transform = 'translateX(-' + this.labelsLeft + 'px)';
      this.hoverBar();
    }
    this.showPrevNext();
  }

  public nextClick() {
    if (this.header.offsetWidth + this.labelsLeft < this.labels.offsetWidth && this.leftIndex < this.labelRef.length - 1) {
      let label: HTMLElement = this.labelRef.toArray()[this.leftIndex++].nativeElement;
      this.labelsLeft += label.offsetWidth;
      this.labels.style.transform = 'translateX(-' + this.labelsLeft + 'px)';
      this.hoverBar();
    }
    this.showPrevNext();
  }

  private hoverBar() {
    if (!this.labelRef) {
      return;
    }
    let labels = this.labelRef.toArray();
    let label: HTMLElement;
    for (let i = 0, l = labels.length; i < l; i++) {
      label = labels[i].nativeElement;
      if (i == this.currentIndex) {
        break;
      }
    }
    if (label) {
      this.contents.style.transform = 'translateX(-' + (this.currentIndex * 100) + '%)';
    }
  }

}
