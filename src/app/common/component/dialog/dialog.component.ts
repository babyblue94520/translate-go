import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Debounce } from 'ts/decorators/debounce';
import { Overlay } from 'ts/component/overlay';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnDestroy {
  private dialogWindow: HTMLElement;
  private toolbar: HTMLElement;
  private overlay = new Overlay(10000);
  private outlet: DomPortalOutlet;

  public marginBottom = '10px';
  public _windowClassName;
  public show = false;

  public resizeObserver;
  @ViewChild('dialog')
  public templateRef: TemplateRef<any>;

  @Input()
  set windowClassName(value: string) {
    this._windowClassName = value;
  }

  @Input()
  public title;

  @Input()
  public onClose: Function;

  @Input()
  public top: string;
  @Input()
  public height: string;
  @Input()
  public width: string;

  private onImgLoad;

  private onResize;

  private _open = false;

  constructor(
    private cdf: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {

    this.onImgLoad = this.resize.bind(this);
    this.onResize = this.resize.bind(this);

    this.resizeObserver = new MutationObserver(entries => {
      if (this._open) {
        this.delayAddImageOnload();
        this.resize();
      }
    });
  }

  ngOnDestroy() {
    this.destroy();
  }

  public isOpen(): boolean {
    return this._open;
  }

  /**
   * 打開Dialog
  */
  public open() {
    if (this._open) {
      return;
    }
    this._open = true;
    this.overlay.open(this.doOpen);
  }

  /**
   * 關閉Dialog
  */
  public close() {
    this._open = false;
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.onResize);
    this.overlay.close(this.doClose);
  }

  /**
   * 讓overlay 呼叫的callback
  */
  private doOpen = () => {
    this.cdf.markForCheck();
    if (!this.outlet) {
      let wrapper = this.overlay.getElement();
      this.outlet = new DomPortalOutlet(wrapper
        , this.componentFactoryResolver
        , this.injector.get<ApplicationRef>(ApplicationRef)
        , this.injector
      );
      this.outlet.attach(new TemplatePortal(
        this.templateRef
        , this.viewContainerRef
      ));
      this.toolbar = wrapper.querySelector('.ttb-dialog-toolbar');
      this.dialogWindow = wrapper.querySelector('.ttb-dialog-window');
      this.resizeObserver.observe(this.dialogWindow, {
        attributes: true
        , childList: true
        , characterData: true
        , subtree: true
      });
    }

    if (this.toolbar.childElementCount == 0) {
      this.toolbar.style.display = 'none';
      this.marginBottom = '10px';
    } else {
      this.toolbar.style.display = 'block';
      this.marginBottom = (this.toolbar.offsetHeight + 10) + 'px';
    }
    this.addImageOnload();
    window.addEventListener('resize', this.onResize);

    this.delayShow();
  }

  @Debounce(50)
  private delayAddImageOnload() {
    this.addImageOnload();
  }

  private addImageOnload() {
    let imgs = this.dialogWindow.querySelectorAll('img');
    imgs.forEach(img => {
      img.removeEventListener('load', this.onImgLoad);
      img.addEventListener('load', this.onImgLoad);
    });
  }

  @Debounce(100)
  private delayShow() {
    this.show = true;
    this.cdf.markForCheck();
  }

  /**
   * 讓overlay 呼叫的callback
   * 等待動畫結束後才移除物件
  */
  private doClose = () => {
    this.show = false;
    if (this.onClose instanceof Function) {
      this.onClose();
    }
    if (this.outlet) {
      this.outlet.dispose();
      this.outlet = null;
    }
  }

  /**
   * 移除物件
   */
  private destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.onResize);
    if (this.outlet) {
      this.outlet.dispose();
      this.outlet = null;
    }
    if (this.overlay) {
      this.overlay.destory();
      this.overlay = null;
    }
  }

  @Debounce(100)
  private resize() {
    if (this.dialogWindow && this.overlay) {
      if (this.dialogWindow.clientHeight > window.innerHeight) {
        this.overlay.top();
      } else {
        this.overlay.center();
      }
    }
  }
}
