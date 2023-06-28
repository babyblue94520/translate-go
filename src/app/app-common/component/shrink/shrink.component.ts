import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Async } from '@cui/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-shrink',
    templateUrl: './shrink.component.html',
    styleUrls: ['./shrink.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgTemplateOutlet]
})
export class ShrinkComponent implements AfterViewInit {
  private timer;
  private shrink: HTMLElement;
  private header: HTMLElement;
  private content: HTMLElement;

  @ViewChild('header')
  public headerRef: TemplateRef<any>;
  @Input()
  public title = '';
  @ViewChild('shrink')
  public shrinkRef: ElementRef;
  @ViewChild('inside')
  public insideRef: ElementRef;
  @Input()
  public shadow = false;

  constructor() {

  }

  @Input()
  extend = false;

  ngAfterViewInit(): void {
    this.shrink = this.shrinkRef.nativeElement;
    this.header = this.shrink.children[0] as HTMLElement;
    this.content = this.shrink.children[1] as HTMLElement;

    if (this.extend) {
      this.content.style.opacity = '1';
      this.content.style.height = 'auto';
      this.header.classList.remove('close');
    } else {
      this.content.style.opacity = '.5';
      this.content.style.height = '0px';
      this.header.classList.add('close');
    }
  }

  public openOrClose() {
    if (this.extend) {
      this.close();
    } else {
      this.open();
    }
  }

  public open() {
    if (!this.extend) {
      this.extend = true;
      this.header.classList.remove('close');
      this.content.style.opacity = '1';
      this.content.style.height = this.getAllHeight() + 'px';
      clearTimeout(this.timer);
      this.timer = this.asyncHeightAuto();
    }
  }

  public close() {
    if (this.extend) {
      this.extend = false;
      this.header.classList.add('close');
      this.content.style.opacity = '.5';
      this.content.style.height = this.getAllHeight() + 'px';
      clearTimeout(this.timer);
      this.timer = this.asyncHeightZero();
    }
  }

  @Async(300)
  private asyncHeightAuto() {
    this.content.style.height = 'auto';
  }

  @Async(0)
  private asyncHeightZero() {
    this.content.style.height = '0px';
  }

  private getAllHeight() {
    return this.insideRef.nativeElement.offsetHeight;
  }

}
