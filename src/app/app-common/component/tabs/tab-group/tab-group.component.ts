import { Delay, toDelayFn } from 'ts/lib/cui/core/decorators/delay';
import { TabComponent } from '../tab/tab.component';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, NgTemplateOutlet]
})
export class TabGroupComponent implements AfterViewInit, OnDestroy {

  private header: HTMLElement;
  private hoverBar: HTMLElement;
  private labels: HTMLElement;
  private contents: HTMLElement;
  private prev: HTMLElement;
  private next: HTMLElement;

  private leftIndex = 0;
  private labelsLeft = 0;

  @ViewChildren('labels')
  public labelsRef: QueryList<ElementRef>;

  @ContentChildren(TabComponent)
  public tabsRef: QueryList<TabComponent>;

  @Input()
  public activeIndex: number;

  constructor(
    private elementRef: ElementRef,
    private cdf: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    let element: HTMLElement = this.elementRef.nativeElement;
    this.header = element.querySelector('.ttb-tab-header');
    this.hoverBar = element.querySelector('.ttb-tab-header-hover');
    this.labels = element.querySelector('.ttb-tab-labels');
    this.contents = element.querySelector('.ttb-tab-contents');
    this.prev = element.querySelector('.ttb-tab-prev');
    this.prev.addEventListener('click', this.prevClick.bind(this));
    this.next = element.querySelector('.ttb-tab-next');
    this.next.addEventListener('click', this.nextClick.bind(this));

    window.addEventListener('resize', this.resize);

    this.initActiveIndex();
    this.active();
    this.hover();
    this.showPrevNext();

    this.tabsRef.changes.subscribe(() => {
      if (this.tabsRef.length) {
        this.initActiveIndex();
        this.active();
      } else {
        this.contentClear();
      }
    });

    this.labelsRef.changes.subscribe(() => {
      if (this.labelsRef.length) {
        this.hover();
        this.showPrevNext();
      } else {
        this.headerClear();
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resize);
  }

  public getLabelClass(tab: TabComponent): string {
    return `ttb-tab-label ${(tab.active ? 'active' : '')} ${(tab.disabled ? 'disabled' : '')}`;
  }
  public getContentClass(tab: TabComponent): string {
    return `ttb-tab-content ${(tab.active ? 'active' : '')}`;
  }

  private resize = toDelayFn(() => {
    this.cdf.markForCheck();
    this.showPrevNext();
  }, 300);

  private headerClear() {
    if (this.labels) {
      this.labels.style.transform = '';
    }
    if (this.hoverBar) {
      this.hoverBar.style.width = '0px';
      this.hoverBar.style.transform = '';
    }
  }

  private contentClear() {
    if (this.contents) {
      this.contents.style.transform = '';
    }
  }

  private initActiveIndex() {
    if (this.activeIndex != undefined) { return; }
    if (!this.tabsRef) { return; }
    this.activeIndex = 0;
    this.tabsRef.forEach((tab, i) => {
      if (tab.active) {
        this.activeIndex = i;
      }
    });
  }

  @Delay(0)
  public active(index: number = this.activeIndex) {
    this.cdf.markForCheck();
    if (!this.tabsRef) { return; }
    if (isNaN(index) || index < 0) {
      index = 0;
    } else if (index >= this.tabsRef.length) {
      index = this.tabsRef.length - 1;
    }
    let tab = this.tabsRef.get(index);
    if (!tab || tab.disabled) return;
    this.activeIndex = index;
    this.tabsRef.forEach((tab, i) => {
      tab.active = index == i;
    });
    tab.doActive(index);
    this.contents.style.transform = `translateX(-${index * 100}%)`;
  }

  private showPrevNext() {
    if (!this.labels) return;
    this.prev.style.display = 'none';
    this.next.style.display = 'none';

    if (this.labels.offsetWidth > this.header.offsetWidth) {
      if (this.labelsLeft != 0) {
        this.prev.style.display = '';
      }
      if (this.header.offsetWidth + this.labelsLeft < this.labels.offsetWidth) {
        this.next.style.display = '';
      }
    } else {
      this.labelsLeft = 0;
      this.labels.style.transform = 'translateX(0px)';
      this.hover();
    }
  }

  public prevClick() {
    if (this.leftIndex != 0) {
      let label = this.labelsRef.get(--this.leftIndex);
      if (this.leftIndex == 0) {
        this.labelsLeft = 0;
      } else {
        this.labelsLeft -= label.nativeElement.offsetWidth;
      }
      this.labels.style.transform = `translateX(-${this.labelsLeft}px)`;
      this.hover();
    }
    this.showPrevNext();
  }

  public nextClick() {
    if (this.header.offsetWidth + this.labelsLeft < this.labels.offsetWidth && this.leftIndex < this.labelsRef.length - 1) {
      let label = this.labelsRef.get(this.leftIndex++);
      this.labelsLeft += label.nativeElement.offsetWidth;
      this.labels.style.transform = `translateX(-${this.labelsLeft}px)`;
      this.hover();
    }
    this.showPrevNext();
  }

  private hover(index = this.activeIndex) {
    if (!this.labelsRef) return;
    let label = this.labelsRef.get(index);
    if (!label) return;
    let left = 0;
    this.labelsRef.forEach((value, i) => {
      if (i <= index) {
        left += value.nativeElement.offsetWidth;
      }
    });
    this.hoverBar.style.width = label.nativeElement.offsetWidth + 'px';
    this.hoverBar.style.transform = `translateX(${left - this.labelsLeft}px)`;
  }
}
