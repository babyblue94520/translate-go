import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Overlay, Delay } from '@cui/core';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnDestroy {
  private dialogWindow: HTMLElement;
  private outlet: DomPortalOutlet;

  public show = false;

  private readonly resizeObserver = new MutationObserver(entries => {
    if (this.show) {
      this.delayAddImageOnload();
      this.resize();
    }
  });

  @ViewChild(TemplateRef)
  protected templateRef: TemplateRef<any>;

  @Input()
  public windowSize: '' | 'large' | 'small' | 'full' = '';

  @Input()
  public windowClassName = '';

  @Input()
  public title = '';

  @Input()
  public height: string;

  @Input()
  public width: string;

  public over: string = '';

  private overlay = new Overlay({
    zIndex: 10000
    , onOpen: this.doOpen.bind(this)
    , onClose: this.doClose.bind(this)
  });

  private onImgLoad = () => {
    this.resize();
  }

  private onResize = () => {
    this.resize();
  }

  @Input()
  public canClose = (): boolean | Promise<boolean> => true

  @Input()
  public onClose = () => { }

  constructor(
    private cdf: ChangeDetectorRef,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnDestroy() {
    this.destroy();
  }

  public isOpen(): boolean {
    return this.show;
  }

  public open() {
    if (this.show) {
      return;
    }
    this.show = true;
    this.overlay.open();
    this.delayAddImageOnload();
    this.resize();
  }

  public async close() {
    if (!await this.canClose()) { return; }
    this.resizeObserver.disconnect();
    this.onClose();
    this.overlay.close();
  }

  /**
   * 讓overlay 呼叫的callback
  */
  private doOpen() {
    this.cdf.markForCheck();
    if (!this.outlet) {
      let wrapper = this.overlay.getElement();
      this.outlet = new DomPortalOutlet(
        wrapper
        , null
        , this.injector.get<ApplicationRef>(ApplicationRef)
        , this.injector
      );
      this.outlet.attach(new TemplatePortal(
        this.templateRef
        , this.viewContainerRef
      ));
      this.dialogWindow = wrapper.querySelector('.ttb-dialog-window');
    }

    this.resizeObserver.observe(this.dialogWindow, {
      attributes: true
      , childList: true
      , characterData: true
      , subtree: true
    });

    this.addImageOnload();
    window.addEventListener('resize', this.onResize);

    this.delayShow();
  }

  @Delay(50)
  private delayAddImageOnload() {
    this.cdf.markForCheck();
    this.addImageOnload();
  }

  private addImageOnload() {
    let imgs = this.dialogWindow.querySelectorAll('img');
    imgs.forEach(img => {
      img.removeEventListener('load', this.onImgLoad);
      img.addEventListener('load', this.onImgLoad);
    });
  }

  @Delay(100)
  private delayShow() {
    this.cdf.markForCheck();
    this.show = true;
  }

  /**
   * 讓overlay 呼叫的callback
   * 等待動畫結束後才移除物件
  */
  private doClose() {
    this.show = false;
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.onResize);
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

  @Delay(100)
  private resize() {
    this.cdf.markForCheck();
    if (this.dialogWindow) {
      this.over = this.dialogWindow.clientHeight > window.innerHeight ? 'over' : '';
    }
  }

  public getClassName(): string {
    return `ttb-dialog-window ${this.getSizeClass()} ${this.windowClassName} ${this.show ? 'show' : ''}`;
  }

  public getSizeClass(): string {
    switch (this.windowSize) {
      case 'small':
        return 'ttb-col-xs32-8 ttb-col-xs48-6 ttb-col-sm-4';
      case 'large':
        return 'ttb-col-xs32-12 ttb-col-xs48-10';
      case 'full':
        return 'full';
      default:
        return 'ttb-col-xs32-10 ttb-col-xs48-8 ttb-col-sm-6';
    }
  }
}
